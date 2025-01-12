"use client";

import { useAppSelector } from "../_providers/StoreProvider/config/hooks";
import SignInForm from "@/features/auth/ui/SignInForm";
import AddPostForm from "@/features/post/ui/AddPostForm";
import { PostList } from "@/features/post/ui/PostList";

export default function Posts() {
  const username = useAppSelector((state) => state.auth.username);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <section className="w-full mb-4">
        <h1 className="text-2xl font-bold mb-4">Blog Posts</h1>
      </section>
      <section className="w-full mb-4">
        <PostList />
      </section>
      <section className="w-full mb-4">
        {username ? <AddPostForm /> : <SignInForm />}
      </section>
    </div>
  );
}
