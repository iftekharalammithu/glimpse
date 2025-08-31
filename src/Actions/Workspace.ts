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

export const CreateWorkspace = async (name: string) => {
  try {
    const user = await currentUser();
    if (!user) {
      return { status: 404 };
    }
    const authorized = await prisma.user.findUnique({
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

    if (authorized?.subscription?.plan === "PRO") {
      const workspace = await prisma.user.update({
        where: {
          clerkId: user.id,
        },
        data: {
          workspace: {
            create: {
              name,
              type: "PUBLIC",
            },
          },
        },
      });
      if (workspace) {
        return { status: 201, data: "Workspace Created" };
      }
    }
    return {
      status: 404,
      data: "You are not authorized to create a workspace",
    };
  } catch (error) {
    return { status: 404, data: [], error: error };
  }
};

export const renameFolders = async (folderId: string, name: string) => {
  try {
    const user = await currentUser();
    if (!user) {
      return { status: 404 };
    }
    const folder = await prisma.folder.update({
      where: {
        id: folderId,
      },
      data: {
        name,
      },
    });
    if (folder) {
      return { status: 200, data: "Folder Renamed" };
    }
    return { status: 400, data: "Folder does not exist" };
  } catch (error) {
    return { status: 500, error: error, data: " Oops! Something went Wrong" };
  }
};

export const createFolder = async (workspaceId: string) => {
  try {
    const isNewFolder = await prisma.workSpace.update({
      where: {
        id: workspaceId,
      },
      data: {
        folders: {
          create: {
            name: "Untitled",
          },
        },
      },
    });
    if (isNewFolder) {
      return { status: 200, data: "News Folder Created" };
    }
  } catch (error) {
    return { status: 400, data: "Some things went wrong" };
  }
};

export const getFolderInfo = async (folderId: string) => {
  try {
    const folder = await prisma.folder.findUnique({
      where: {
        id: folderId,
      },
      select: {
        name: true,
        _count: {
          select: {
            videos: true,
          },
        },
      },
    });
    if (folder) {
      return { status: 200, data: folder };
    }
    return { status: 400, data: null };
  } catch (error) {
    return { status: 400, data: "some Thing went wrong" };
  }
};
