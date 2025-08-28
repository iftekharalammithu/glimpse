"use server";

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export const onAuthenticateUser = async () => {
  try {
    const user = await currentUser();
    if (!user) {
      return { status: 403 };
    }
    const existUser = await prisma.user.findUnique({
      where: {
        clerkId: user.id,
      },
      include: {
        workspace: {
          where: {
            User: {
              clerkId: user.id,
            },
          },
        },
      },
    });

    if (existUser) {
      return { status: 200, user: existUser };
    }

    const newuser = await prisma.user.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        firstname: user.firstName,
        lastname: user.lastName,
        image: user.imageUrl,
        studio: {
          create: {},
        },
        subscription: {
          create: {},
        },
        workspace: {
          create: {
            name: `${user.firstName}'s Workspace`,
            type: "PERSONAL",
          },
        },
      },
      include: { workspace: true, subscription: { select: { plan: true } } },
    });

    if (newuser) {
      return { status: 201, user: newuser };
    }
    return { status: 500 };
  } catch (error) {
    return { status: 500, error: error };
  }
};

export const getNotification = async () => {
  try {
    const user = await currentUser();
    if (!user) {
      return { status: 404 };
    }
    const notification = await prisma.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        notification: true,
        _count: {
          select: {
            notification: true,
          },
        },
      },
    });

    if (notification && notification.notification.length > 0) {
      return { status: 200, data: notification };
    }
    return { status: 404, data: [] };
  } catch (error) {
    return { status: 404, data: [], error: error };
  }
};

export const searchUser = async (query: string) => {
  try {
    const user = await currentUser();
    if (!user) {
      return { status: 404 };
    }

    const users = await prisma.user.findMany({
      where: {
        OR: [
          { firstname: { contains: query } },
          { email: { contains: query } },
          { lastname: { contains: query } },
        ],
        NOT: [{ clerkId: user.id }],
      },
      select: {
        id: true,
        subscription: {
          select: {
            plan: true,
          },
        },
        firstname: true,
        lastname: true,
        image: true,
        email: true,
      },
    });

    if (users && users.length > 0) {
      return { status: 200, data: users };
    }
    return { status: 404, data: undefined };
  } catch (error) {
    console.log(error);
    return { status: 500, data: undefined };
  }
};
