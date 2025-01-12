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
import useAddPost from "../model/useAddPost";

export default function AddPostForm() {
  const { handleSubmit, isPending, users, handleImageChange } = useAddPost();

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
