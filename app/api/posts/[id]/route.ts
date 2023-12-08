import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const post = await prisma.post.findUnique({ where: { id } });
    return NextResponse.json(post);
  } catch (error) {
    console.error("Error Fething Post : ", error);
    return NextResponse.json(
      { message: "Could not fetch post" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { title, content, links, selectedCategory, imageUrl, publicId } =
    await req.json();

  const id = params.id; //whatever the name of folder same name will be id

  try {
    const post = await prisma.post.update({
      where: { id },
      data: {
        title,
        content,
        links,
        catName: selectedCategory,
        imageUrl,
        publicId,
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error("Error while updating", error);
    return NextResponse.json(
      { message: "Could update the data" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const id = params.id;
  try {
    const deletedPost = await prisma.post.delete({ where: { id } });

    return NextResponse.json(
      { message: "Successfully deleted post", deletedPost },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error occured Deleted Post", error);
    return NextResponse.json(
      { message: "Couldn't delete the Post" },
      { status: 500 }
    );
  }
}
