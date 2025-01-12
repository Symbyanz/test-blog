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
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/kit/card";
import NotFound from "@/shared/ui/NotFoundBadge";
import ErrorBadge from "@/shared/ui/ErrorBadge";
import useEditPost from "../model/useEditPost";

export default function EditPostForm() {
  const {
    title,
    setTitle,
    content,
    setContent,
    category,
    setCategory,
    banner,
    handleBannerChange,
    isPending,
    handleSubmit,
    loading,
    error,
    notFound,
  } = useEditPost();

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

  if (notFound) {
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
