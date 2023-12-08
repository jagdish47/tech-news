import { CategoriesList } from "@/components/CategoriesList";
import Post from "@/components/Post";
import { TPost } from "./types";

const getPosts = async (): Promise<TPost[] | null> => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/posts`, {
      cache: "no-store",
    });
    if (res.ok) {
      const posts = await res.json();
      return posts;
    }
  } catch (error) {
    console.error("Error Fetching Posts");
  }

  return null;
};

export default async function Home() {
  const posts = await getPosts();

  return (
    <div>
      <CategoriesList />

      {posts && posts.length > 0 ? (
        posts.map((post) => (
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
        <div className="py-6">No Posts to display</div>
      )}
    </div>
  );
}
