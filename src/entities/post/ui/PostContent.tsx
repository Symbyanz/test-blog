"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  useAppDispatch,
  useAppSelector,
} from "@/app/_providers/StoreProvider/config/hooks";
import { useParams, useRouter } from "next/navigation";
import { loadPostsAsync, postRemoved, selectAllPosts } from "../model/slice";
import { Button } from "@/shared/kit/button";
import { PencilIcon, TrashIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/shared/kit/dialog";

export default function PostContent() {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { posts, loading, error } = useAppSelector(selectAllPosts);

  useEffect(() => {
    if (posts.length === 0 && !loading) {
      dispatch(loadPostsAsync());
    }
  }, [dispatch, posts.length, loading]);

  const post = posts.find((post) => post.id === id);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  if (loading) {
    return (
      <section className="flex items-center justify-center h-screen">
        <p className="text-lg font-semibold text-gray-600">Loading...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="flex items-center justify-center h-screen">
        <div className="p-6 bg-red-100 rounded-lg shadow-md text-center">
          <h2 className="text-lg font-semibold text-red-700">Error</h2>
          <p className="text-sm text-red-600">{error}</p>
        </div>
      </section>
    );
  }

  if (!post) {
    return (
      <section className="flex items-center justify-center h-screen">
        <div className="p-6 bg-yellow-100 rounded-lg shadow-md text-center">
          <h2 className="text-lg font-semibold text-yellow-700">
            Post not found!
          </h2>
          <p className="text-sm text-yellow-600">
            Sorry, the post you&apos;re looking for is not available.
          </p>
        </div>
      </section>
    );
  }

  const handleRemove = () => {
    router.push("/posts");
    dispatch(postRemoved(post.id));
  };

  const handleEdit = () => {
    router.push(`/posts/edit/${post.id}`);
  };

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

      <header className="mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-200">{post.title}</h1>
          <p className="text-sm text-gray-300 mt-1">
            By <span className="font-medium text-gray-400">{post.author}</span>{" "}
            | <span>{new Date(post.createdAt).toLocaleDateString()}</span>
          </p>
        </div>
      </header>

      <article className="prose max-w-none mb-6">
        <p className="text-gray-300">{post.content}</p>
      </article>

      <footer className="mt-6">
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

      {/* Кнопки под контентом */}
      <div className="flex gap-4 mt-6 justify-center md:justify-start">
        <Button
          onClick={handleEdit}
          variant="outline"
          className="flex items-center gap-2"
        >
          <PencilIcon className="w-5 h-5" />
          Edit
        </Button>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <TrashIcon className="w-5 h-5" />
              Remove
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle className="sr-only">
              Delete post confirmation
            </DialogTitle>
            <h3 className="text-lg font-semibold text-gray-800">
              Are you sure you want to delete this post?
            </h3>
            <DialogFooter>
              <Button
                onClick={() => setIsDialogOpen(false)}
                variant="secondary"
              >
                Cancel
              </Button>
              <Button onClick={handleRemove} variant="destructive">
                Yes, Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
