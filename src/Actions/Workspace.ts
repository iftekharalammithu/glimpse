"use server";

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export const verifyAccessWorkspace = async (workspaceId: string) => {
  try {
    const user = await currentUser();
    if (!user) {
      return { status: 403 };
    }

    const isUserInWorkspace = await prisma.workSpace.findUnique({
      where: {
        id: workspaceId,
        OR: [
          {
            User: {
              clerkId: user.id,
            },
          },
          {
            members: {
              every: {
                User: {
                  clerkId: user.id,
                },
              },
            },
          },
        ],
      },
    });

    return { status: 200, data: { workspace: isUserInWorkspace } };
  } catch (error) {
    return { status: 503, error: error, workspace: null };
  }
};

export const getWorkspaceFolder = async (workSpaceId: string) => {
  try {
    const isFolders = await prisma.folder.findMany({
      where: {
        workSpaceId,
      },
      include: {
        _count: {
          select: {
            videos: true,
          },
        },
      },
    });
    if (isFolders && isFolders.length > 0) {
      return { status: 200, data: isFolders };
    }
    return { status: 404, data: [] };
  } catch (error) {
    return { status: 403, data: [], error: error };
  }
};
export const getAllUserVideo = async (workSpaceId: string) => {
  try {
    const user = await currentUser();
    if (!user) {
      return { status: 404 };
    }

    const video = await prisma.video.findMany({
      where: {
        OR: [{ workSpaceId }, { folderId: workSpaceId }],
      },
      select: {
        id: true,
        title: true,
        createdAt: true,
        source: true,
        processing: true,
        Folder: {
          select: { id: true, name: true },
        },
        User: {
          select: {
            firstname: true,
            lastname: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    if (video && video.length > 0) {
      return { status: 200, data: { video } };
    }
    return { status: 404, data: [] };
  } catch (error) {
    return { status: 403, error: error };
  }
};

export const getWorkscapes = async () => {
  try {
    const user = await currentUser();
    if (!user) {
      return { status: 404 };
    }
    const workspace = await prisma.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        subscription: {
          select: {
            plan: true,
          },
        },
        workspace: {
          select: {
            id: true,
            name: true,
            type: true,
          },
        },
        members: {
          select: {
            WorkSpace: {
              select: {
                id: true,
                name: true,
                type: true,
              },
            },
          },
        },
      },
    });

    if (workspace) {
      return { status: 200, data: workspace };
    }
    return { status: 404, data: [] };
  } catch (error) {
    return { status: 404, data: [], error: error };
  }
};
