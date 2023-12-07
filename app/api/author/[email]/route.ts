import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { email: string } }
) {
  try {
    const email = params.email; //as folder is(email) so id will be email
    const posts = await prisma.user.findUnique({
      where: { email },
      include: {
        posts: { orderBy: { createdAt: "desc" } },
      },
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error to getting category post", error);
    return NextResponse.json(
      { message: "Couldn't find category post" },
      { status: 500 }
    );
  }
}
