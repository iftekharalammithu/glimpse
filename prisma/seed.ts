import { PrismaClient, SUBSCRIPTION_PLAN, PRESET, Type } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Create Users
  const users = await Promise.all(
    Array.from({ length: 10 }).map(async () => {
      return prisma.user.create({
        data: {
          email: faker.internet.email(),
          firstname: faker.person.firstName(),
          lastname: faker.person.lastName(),
          clerkId: faker.string.uuid(),
          image: faker.image.avatar(),
          trail: faker.datatype.boolean(),
          studio: {
            create: {
              screen: faker.word.sample(),
              mic: faker.word.sample(),
              camera: faker.word.sample(),
              preset: faker.helpers.arrayElement([PRESET.HD, PRESET.SD]),
            },
          },
          subscription: {
            create: {
              plan: faker.helpers.arrayElement([
                SUBSCRIPTION_PLAN.PRO,
                SUBSCRIPTION_PLAN.FREE,
              ]),
              customerId: faker.string.uuid(),
            },
          },
        },
      });
    })
  );

  // Workspaces
  const workspaces = await Promise.all(
    users.map(async (user) => {
      return prisma.workSpace.create({
        data: {
          name: faker.company.name(),
          type: faker.helpers.arrayElement([Type.PERSONAL, Type.PUBLIC]),
          userId: user.id,
          folders: {
            create: Array.from({ length: 3 }).map(() => ({
              name: faker.commerce.department(),
            })),
          },
        },
        include: { folders: true },
      });
    })
  );

  // Videos
  for (const ws of workspaces) {
    for (const folder of ws.folders) {
      await prisma.video.createMany({
        data: Array.from({ length: 5 }).map(() => ({
          title: faker.lorem.words(3),
          description: faker.lorem.sentence(),
          source: faker.internet.url(),
          folderId: folder.id,
          workSpaceId: ws.id,
          userId: ws.userId!,
          processing: faker.datatype.boolean(),
          views: faker.number.int({ min: 0, max: 10000 }),
          summary: faker.lorem.sentences(2),
        })),
      });
    }
  }

  // Members
  await Promise.all(
    workspaces.map(async (ws) => {
      return prisma.member.createMany({
        data: users.map((user) => ({
          userId: user.id,
          workSpaceId: ws.id,
          member: faker.datatype.boolean(),
        })),
      });
    })
  );

  // Notifications
  await prisma.notification.createMany({
    data: users.map((u) => ({
      userId: u.id,
      content: faker.lorem.sentence(),
    })),
  });

  // Invites
  for (let i = 0; i < 20; i++) {
    const sender = faker.helpers.arrayElement(users);
    const receiver = faker.helpers.arrayElement(
      users.filter((u) => u.id !== sender.id)
    );
    const ws = faker.helpers.arrayElement(workspaces);

    await prisma.invite.create({
      data: {
        senderId: sender.id,
        recieverId: receiver.id,
        content: faker.lorem.sentence(),
        workSpaceId: ws.id,
        accepted: faker.datatype.boolean(),
      },
    });
  }

  console.log("✅ Seeding complete!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
