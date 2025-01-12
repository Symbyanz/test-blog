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
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import {
  postUpdated,
  loadPostsAsync,
  selectAllPosts,
} from "@/entities/post/model/slice";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/kit/card";
import { toast } from "@/shared/lib/react/use-toast";
import NotFound from "@/shared/ui/NotFoundBadge";
import ErrorBadge from "@/shared/ui/ErrorBadge";

export default function EditPostForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [banner, setBanner] = useState<File | null>(null);
  const [isPending, setIsPending] = useState(false);

  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { posts, loading, error, hasLoaded } = useAppSelector(selectAllPosts);

  useEffect(() => {
    if (!hasLoaded) {
      dispatch(loadPostsAsync());
    }
  }, [dispatch, hasLoaded]);

  useEffect(() => {
    if (hasLoaded && posts.length > 0) {
      const post = posts.find((post) => post.id === id);
      if (post) {
        setTitle(post.title);
        setContent(post.content);
        setCategory(post.category);
      }
    }
  }, [posts, hasLoaded, id]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title || !content || !category) {
      toast({
        title: "Validation Error",
        description: "All fields are required.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsPending(true);
      dispatch(postUpdated(id as string, { title, content, category }));
      toast({
        title: "Post Updated",
        description: "Your post has been successfully updated.",
        variant: "default",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to create the post.",
        variant: "destructive",
      });
    } finally {
      setIsPending(false);
    }
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
    return <ErrorBadge title="Error" description={error} />;
  }

  if (!posts.length) {
    return (
      <NotFound
        title="Post not found!"
        description="Sorry, the post you're looking for are not available."
      />
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
              onChange={(e) => setTitle(e.target.value || "")}
              placeholder="Title"
              required
              className="w-full"
            />
          </div>

          <div className="col-span-1 md:col-span-1">
            <Select
              name="category"
              required
              defaultValue={category}
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
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Saving..." : "Save changes"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
