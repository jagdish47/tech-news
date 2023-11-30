import { CategoriesList } from "@/components/CategoriesList";
import Post from "@/components/Post";
import { postsData } from "@/data";

export default function Home() {
  return (
    <div>
      <CategoriesList />

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
        <div className="py-6">No Posts to display</div>
      )}
    </div>
  );
}
