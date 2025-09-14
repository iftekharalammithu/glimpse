import prisma from "@/lib/prisma";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // filename send in the body

    const body = await req.json();
    const { id } = params;

    const personalworkspaceId = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        workspace: {
          where: {
            type: "PERSONAL",
          },
          select: {
            id: true,
          },
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    const startProcessingVideo = await prisma.workSpace.update({
      where: {
        id: personalworkspaceId?.workspace[0].id,
      },
      data: {
        videos: {
          create: {
            source: body.filename,
            userId: id,
          },
        },
      },
      select: {
        User: {
          select: {
            subscription: {
              select: {
                plan: true,
              },
            },
          },
        },
      },
    });
    if (startProcessingVideo) {
      return NextResponse.json({
        status: 200,
        plan: startProcessingVideo.User?.subscription?.plan,
      });
    }
    return NextResponse.json({ status: 400 });
  } catch (error) {
    return NextResponse.json({ status: 400 });
  }
}
