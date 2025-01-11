import { PostList } from "@/entities/post/ui/PostList";
import AddPostForm from "@/entities/post/ui/AddPostForm";

export default function Posts() {
  return (
    <div className="max-w-6xl mx-auto p-4">
      <section className="w-full mb-4">
        <h1 className="text-2xl font-bold mb-4">Blog Posts</h1>
      </section>
      <section className="w-full mb-4">
        <PostList />
      </section>
      <section className="w-full mb-4">
        <AddPostForm />
      </section>
    </div>
  );
}
