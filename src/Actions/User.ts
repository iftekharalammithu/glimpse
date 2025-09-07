"use server";

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import type { string } from "zod/v3";

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
    if (comment && comment.length > 0) {
      return { status: 200, data: comment };
    }
    return { status: 404 };
  } catch (error) {
    return { status: 404 };
  }
};
