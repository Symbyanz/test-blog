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
import {
  useAppDispatch,
  useAppSelector,
} from "@/app/_providers/StoreProvider/config/hooks";
import { postAdded } from "../model/slice";
import React, { useState } from "react";
import { toast } from "@/shared/lib/react/use-toast";
import { selectAllUsers } from "@/entities/user/model/slice";

export default function AddPostForm() {
  const [isPending, setIsPending] = useState(false);
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectAllUsers);

  const [, setImageUrl] = useState<string>("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const mockImageUrl = URL.createObjectURL(file);
      setImageUrl(mockImageUrl);
      // load to server
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const author = formData.get("author") as string;
    const category = formData.get("category") as string;

    if (!title || !content || !author) {
      toast({
        title: "Error",
        description: "title, content and author are required.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsPending(true);
      dispatch(postAdded(title, content, author, category));
      toast({
        title: "Post Created",
        description: "Your post has been successfully created.",
        variant: "default",
      });
      e.currentTarget.reset();
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

  return (
    <Card className="w-full shadow-md">
      <CardHeader>
        <CardTitle>Add new post</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
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
            <Select name="author" disabled={isPending}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select author" />
              </SelectTrigger>
              <SelectContent>
                {users.map((user) => (
                  <SelectItem key={user.id} value={user.id}>
                    {user.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Adding..." : "Add post"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
