"use server";

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import nodemailer from "nodemailer";
import Stripe from "stripe";

export const sendEmail = async (
  to: string,
  subject: string,
  text: string,
  html?: string
) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAILER_EMAIL,
      pass: process.env.MAILER_PASSWORD,
    },
  });

  const mailOptions = {
    to,
    subject,
    text,
    html,
  };
  return { transporter, mailOptions };
};
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

export const getPaymentInfo = async () => {
  try {
    const user = await currentUser();
    if (!user) {
      return { status: 404 };
    }
    const payment = await prisma.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        subscription: {
          select: {
            plan: true,
          },
        },
      },
    });
    if (payment) {
      return { status: 200, data: payment };
    }
    return { status: 404 };
  } catch (error) {
    return { status: 404 };
  }
};

export const getFirstView = async () => {
  try {
    const user = await currentUser();
    if (!user) {
      return { status: 404 };
    }

    const userdata = await prisma.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        firstView: true,
      },
    });
    if (userdata) {
      return { status: 200, data: userdata.firstView };
    }

    return { status: 404 };
  } catch (error) {
    return { status: 404 };
  }
};

export const enableFirstView = async (checked: boolean) => {
  try {
    const user = await currentUser();
    if (!user) {
      return { status: 404 };
    }

    const view = await prisma.user.update({
      where: {
        clerkId: user.id,
      },
      data: {
        firstView: checked,
      },
    });

    if (view) {
      return { status: 200, data: "Setting Update" };
    }

    return { status: 404 };
  } catch (error) {
    return { status: 404 };
  }
};

export const createCommentAndReply = async (
  userid: string,
  comment: string,
  videoId: string,
  commentId?: string
) => {
  try {
    if (commentId) {
      const reply = await prisma.comment.update({
        where: { id: commentId },
        data: {
          reply: {
            create: {
              comment,
              userId: userid,
              videoId,
            },
          },
        },
      });
      if (reply) {
        return { status: 200, data: "Reply posted" };
      }
    }

    const newComment = await prisma.video.update({
      where: {
        id: videoId,
      },
      data: {
        comment: {
          create: {
            comment,
            userId: userid,
          },
        },
      },
    });
    if (newComment) {
      return { status: 200, data: "New Comment Added" };
    }
    return { status: 404 };
  } catch (error) {}
};

export const getUserProfile = async () => {
  try {
    const user = await currentUser();
    if (!user) {
      return { status: 404 };
    }

    const profitIdAndImage = await prisma.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        image: true,
        id: true,
      },
    });
    if (profitIdAndImage) {
      return { status: 200, data: profitIdAndImage };
    }
    return { status: 404 };
  } catch (error) {
    return { status: 404 };
  }
};

export const getVideoComment = async (id: string) => {
  try {
    const comment = await prisma.comment.findMany({
      where: {
        OR: [{ videoId: id }, { commentId: id }],
        commentId: null,
      },
      include: {
        reply: {
          include: {
            User: true,
          },
        },
        User: true,
      },
    });
    return { status: 200, data: comment };
  } catch (error) {
    return { status: 404 };
  }
};

export const inviteMember = async (
  recieverId: string,
  email: string,
  workspaceId: string
) => {
  try {
    const user = await currentUser();
    if (!user) {
      return { status: 404 };
    }
    const senderInfo = await prisma.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        id: true,
        firstname: true,
        lastname: true,
      },
    });
    if (senderInfo?.id) {
      const workspace = await prisma.workSpace.findUnique({
        where: {
          id: workspaceId,
        },
        select: {
          name: true,
        },
      });
      if (workspace) {
        const invitation = await prisma.invite.create({
          data: {
            senderId: senderInfo.id,
            recieverId,
            workSpaceId: workspaceId,
            content: `You are invited to join ${workspace.name} Workspace, click accpect to confirm`,
          },
          select: {
            id: true,
          },
        });
        await prisma.user.update({
          where: {
            clerkId: user.id,
          },
          data: {
            notification: {
              create: {
                content: `${user.firstName} ${user.lastName} invited ${senderInfo.firstname} into this ${workspace?.name}`,
              },
            },
          },
        });
        if (invitation) {
          const { transporter, mailOptions } = sendEmail(
            email,
            "You got an invitaion",
            `You are invited to join ${workspace.name} Workspace, click to accept to confirm`,
            `<a href="${process.env.NEXT_PUBLIC_HOST_URL}/invite/${invitation.id}" style="background-color: #000; padding: 5px 10px; border-radius: 10px;">Accept Invite</a>`
          );
          transporter.sendMail(mailOptions, async (error, info) => {
            if (error) {
              console.log("##", error.message);
            } else {
              console.log("✅", info);
            }
          });
          return { status: 200, data: "Invite Sent" };
        }
        return { status: 400, data: "Invite failed" };
      }
      return { status: 400, data: "workspace not found" };
    }
    return { status: 400, data: "recepient not found" };
  } catch (error) {
    return { status: 404, data: "something went wrong" };
  }
};

export const acceptInvite = async (inviteId: string) => {
  try {
    const user = await currentUser();
    if (!user) {
      return { status: 404 };
    }
    const invitation = await prisma.invite.findUnique({
      where: {
        id: inviteId,
      },
      select: {
        workSpaceId: true,
        reciever: {
          select: {
            clerkId: true,
          },
        },
      },
    });

    if (user.id !== invitation?.reciever?.clerkId) {
      return { status: 401 };
    }
    const acceptInvite = await prisma.invite.update({
      where: {
        id: inviteId,
      },
      data: {
        accepted: true,
      },
    });
    const updateMember = await prisma.user.update({
      where: {
        clerkId: user.id,
      },
      data: {
        members: {
          create: {
            workSpaceId: invitation.workSpaceId,
          },
        },
      },
    });
    const memberstransaction = await prisma.$transaction([
      prisma.invite.update({
        where: {
          id: inviteId,
        },
        data: {
          accepted: true,
        },
      }),
      prisma.user.update({
        where: {
          clerkId: user.id,
        },
        data: {
          members: {
            create: {
              workSpaceId: invitation.workSpaceId,
            },
          },
        },
      }),
    ]);
    if (memberstransaction) {
      return { status: 200 };
    }
    return { status: 400 };
  } catch (error) {
    return { status: 404, data: "something went wrong" };
  }
};

const stripeConfig = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export const completeSubscription = async (sessionId: string) => {
  try {
    const user = await currentUser();
    if (!user) {
      return { status: 404 };
    }
    const session = await stripeConfig.checkout.sessions.retrieve(sessionId);
    if (session) {
      const customer = await prisma.user.update({
        where: {
          clerkId: user.id,
        },
        data: {
          subscription: {
            update: {
              data: {
                customerId: session.customer as string,
                plan: "PRO",
              },
            },
          },
        },
      });
      if (customer) {
        return { status: 200 };
      }
      return { status: 404 };
    }
    return { status: 404 };
  } catch (error) {
    return { status: 400, data: "something went wrong" };
  }
};
