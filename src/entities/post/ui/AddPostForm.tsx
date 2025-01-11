"use client";
import { Button } from "@/shared/kit/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/kit/card";
import { Input } from "@/shared/kit/input";
import { Textarea } from "@/shared/kit/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/kit/select";
import { nanoid } from "@reduxjs/toolkit";
import { useAppDispatch } from "@/app/_providers/StoreProvider/config/hooks";
import { postAdded } from "../model/slice";
import { Post } from "../model/types";
import React, { useState } from "react";
import { toast } from "@/shared/lib/react/use-toast";

export default function AddPostForm() {
  const isPending = false;
  const dispatch = useAppDispatch();

  const [, setImageUrl] = useState<string>("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const mockImageUrl = URL.createObjectURL(file);
      setImageUrl(mockImageUrl);
      // load to server
    }
  };

  const handleSubmit = (formData: FormData) => {
    const newPost: Post = {
      id: nanoid(),
      title: String(formData.get("title")) || "",
      content: String(formData.get("content")) || "",
      author: String(formData.get("author")) || "Unknown",
      category: String(formData.get("category")) || "General",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      // banner: imageUrl || "/600x300.png",
      banner: "/600x300.png",
    };
    dispatch(postAdded(newPost));

    toast({
      title: "Post Created",
      description: "Your post has been successfully created.",
      variant: "default",
    });
  };

  return (
    <Card className="w-full shadow-md">
      <CardHeader>
        <CardTitle>Add new post</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4 md:grid-cols-2">
          <div className="col-span-2">
            <Input
              name="title"
              placeholder="Title"
              required
              disabled={isPending}
              className="w-full"
            />
          </div>

          <div className="col-span-2 md:col-span-1">
            <Input
              name="author"
              placeholder="Author"
              required
              disabled={isPending}
              className="w-full"
            />
          </div>

          <div className="col-span-2 md:col-span-1">
            <Select name="category" disabled={isPending}>
              <SelectTrigger className="w-full">
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
              placeholder="Post content"
              required
              disabled={isPending}
              className="w-full"
            />
          </div>

          <div className="col-span-2">
            <Input
              type="file"
              name="banner"
              accept="image/*"
              onChange={handleImageChange}
              disabled={isPending}
              className="w-full"
            />
          </div>

          <div className="col-span-2">
            <Button
              type="submit"
              formAction={handleSubmit}
              className="w-full"
              disabled={isPending}
            >
              {isPending ? "Adding..." : "Add post"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
