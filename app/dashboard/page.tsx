import { postsData } from "@/data";
import Post from "@/components/Post";
import Link from "next/link";

import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { TPost } from "../types";

const getPosts = async (email: string) => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/authors/${email}`);
    const { posts } = await res.json();
    return posts;
  } catch (error) {
    console.error("Error Dashboard Post Fetach", error);
  }
};

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  const email = session?.user?.email;
  let posts = [];

  if (!session) {
    redirect("/sign-in");
  }

  if (email) {
    posts = await getPosts(email);
  }

  return (
    <div>
      {posts && posts.length > 0 ? (
        posts.map((post: TPost) => (
          <Post
            key={post.id}
            id={post.id}
            author={post.author.name}
            authorEmail={post.authorEmail}
            date={post.createdAt}
            thumbnail={post.imageUrl}
            title={post.title}
            content={post.content}
            links={post.link || []}
            category={post.catName}
          />
        ))
      ) : (
        <div className="py-6">
          No Posts created yet.
          <Link className="underline" href={"/create-post"}>
            Create New
          </Link>
        </div>
      )}
    </div>
  );
}
