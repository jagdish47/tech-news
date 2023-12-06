import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function POST(req: Request) {
  const { title, content, links, selectedCategory, imageUrl, publicId } =
    await req.json();

  const authorEmail = "jagdishkumawat81@gmail.com";

  if (!title || !content) {
    return NextResponse.json(
      { error: "Title and Content are required." },
      { status: 500 }
    );
  }

  try {
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        links,
        imageUrl,
        publicId,
        catName: selectedCategory,
        authorEmail,
      },
    });
    console.log("Post Created");
    return NextResponse.json(newPost);
  } catch (error) {
    console.log("Getting while Creating Post", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      include: { author: { select: { name: true } } },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.log("Error while Getting POST", error);
    return NextResponse.json({ error });
  }
}
