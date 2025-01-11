"use client";

import { Button } from "@/shared/kit/button";
import { Input } from "@/shared/kit/input";
import { Textarea } from "@/shared/kit/textarea";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/shared/kit/select";
import {
  useAppDispatch,
  useAppSelector,
} from "@/app/_providers/StoreProvider/config/hooks";
import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Post } from "@/entities/post/model/types";
import {
  postUpdated,
  loadPostsAsync,
  selectAllPosts,
} from "@/entities/post/model/slice";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/kit/card";

export default function EditPostForm() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { posts, loading, error, hasLoaded } = useAppSelector(selectAllPosts);
  const post = posts.find((post) => post.id === id);

  const [title, setTitle] = useState(post?.title || "");
  const [content, setContent] = useState(post?.content || "");
  const [category, setCategory] = useState(post?.category || "General");
  const [banner, setBanner] = useState<File | null>(null);
  const [isUploading] = useState(false);

  useEffect(() => {
    if (!hasLoaded && posts.length === 0) {
      dispatch(loadPostsAsync());
    }
  }, [dispatch, posts.length, hasLoaded]);

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
      setCategory(post.category);
    }
  }, [post]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!post) return;

    const updatedPost: Post = {
      ...post,
      title,
      content,
      category,
      updatedAt: new Date().toISOString(),
    };
    dispatch(postUpdated(updatedPost));
    router.push(`/posts/${id}`);
  };

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setBanner(e.target.files[0]);
    }
  };

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

  return (
    <Card className="w-full shadow-md">
      <CardHeader>
        <CardTitle>Edit Post</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
          <div className="col-span-1">
            <Input
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              required
              className="w-full"
            />
          </div>

          <div className="col-span-1 md:col-span-1">
            <Select
              name="category"
              value={category}
              onValueChange={(value) => setCategory(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="General">General</SelectItem>
                <SelectItem value="Technology">Technology</SelectItem>
                <SelectItem value="Health">Health</SelectItem>
                <SelectItem value="Education">Education</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="col-span-2">
            <Textarea
              name="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Post content"
              required
              className="w-full"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Banner (optional)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleBannerChange}
              className="mt-2 w-full text-sm text-gray-600"
            />
            {banner && (
              <div className="mt-2">
                <Image
                  src={URL.createObjectURL(banner)}
                  alt="Selected banner"
                  width={1200}
                  height={600}
                  className="object-cover w-full h-auto"
                />
              </div>
            )}
          </div>

          <div className="col-span-2">
            <Button type="submit" className="w-full" disabled={isUploading}>
              {isUploading ? "Saving..." : "Save changes"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
