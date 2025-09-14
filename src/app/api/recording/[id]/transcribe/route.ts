import prisma from "@/lib/prisma";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const { id } = params;

    const content = JSON.parse(body.content);
    const transcripe = await prisma.video.update({
      where: {
        userId: id,
        source: body.filename,
      },
      data: {
        title: content.title,
        description: content.summary,
      },
    });
    if (transcripe) {
      return NextResponse.json({ status: 200 });
    }
    return NextResponse.json({ status: 400 });
  } catch (error) {
    return NextResponse.json({ status: 400 });
  }
}
