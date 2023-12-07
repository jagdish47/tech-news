import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { catName: string } }
) {
  try {
    const catName = params.catName; //as folder is(catName) so id will be catName
    const posts = await prisma.category.findUnique({
      where: { catName },
      include: {
        posts: { include: { author: true }, orderBy: { createdAt: "desc" } },
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
