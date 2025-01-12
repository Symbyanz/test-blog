"use client";

import Image from "next/image";
import NotFoundBadge from "@/shared/ui/NotFoundBadge";
import ErrorBadge from "@/shared/ui/ErrorBadge";
import SignInForm from "@/features/auth/ui/SignInForm";
import SinglePostButtons from "./SinglePostButtons";
import PostHeader from "@/features/post/ui/PostHeader";
import PostAuthor from "@/features/post/ui/PostAuthor";
import { useSinglePost } from "../model/useSinglePost";

export default function SinglePost() {
  const { post, loading, error, username } = useSinglePost();

  if (loading) {
    return (
      <section className="flex items-center justify-center h-screen">
        <p className="text-lg font-semibold text-gray-600">Loading...</p>
      </section>
    );
  }

  if (error) {
    return <ErrorBadge title="Error" description={error} />;
  }

  if (!post) {
    return (
      <NotFoundBadge
        title="Post not found!"
        description="Sorry, the post you're looking for are not available."
      />
    );
  }

  return (
    <section className="max-w-6xl mx-auto p-6">
      {post.banner && (
        <div className="mb-6 rounded-md overflow-hidden">
          <Image
            src={post.banner}
            alt={`${post.title} banner`}
            width={1200}
            height={600}
            className="object-cover w-full h-auto"
          />
        </div>
      )}

      <PostHeader
        title={post.title}
        author={<PostAuthor userId={post.userId} />}
        createdAt={new Date(post.createdAt).toLocaleDateString()}
      />

      <article className="prose max-w-none mb-6">
        <p className="text-gray-300">{post.content}</p>
      </article>

      <footer className="my-6">
        <p className="text-sm text-gray-300">
          Category:{" "}
          <span className="font-medium text-gray-400">{post.category}</span>
        </p>
        {post.updatedAt !== post.createdAt && (
          <p className="text-sm text-gray-300">
            Updated at:{" "}
            <span>{new Date(post.updatedAt).toLocaleDateString()}</span>
          </p>
        )}
      </footer>
      {username ? <SinglePostButtons post={post} /> : <SignInForm />}
    </section>
  );
}
