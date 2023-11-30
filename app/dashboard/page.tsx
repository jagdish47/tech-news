import { postsData } from "@/data";
import Post from "@/components/Post";
import Link from "next/link";

export default function Dashboard() {
  return (
    <div>
      {postsData && postsData.length > 0 ? (
        postsData.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            author={post.author}
            authorEmail={"test@gmail.com"}
            date={post.datepublished}
            thumbnail={post.thumbnail}
            title={post.title}
            content={post.content}
            links={post.links || []}
            category={post.category}
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
