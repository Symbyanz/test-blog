import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/kit/card";
import Link from "next/link";
import { Post } from "../../../entities/post/model/types";
import PostAuthor from "./PostAuthor";

interface PostItemProps {
  post: Post;
}

export default function PostItem({ post }: PostItemProps) {
  return (
    <article>
      <Card className="shadow-md h-full">
        <CardHeader>
          <CardTitle className="truncate">
            <Link href={`/posts/${post.id}`} className="hover:underline">
              {post.title.substring(0, 20)}
            </Link>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {post.banner && (
            <div
              className="mb-4 w-full rounded-md overflow-hidden"
              style={{ aspectRatio: "2 / 1" }}
            >
              <Link href={`/posts/${post.id}`}>
                <Image
                  src={post.banner}
                  alt="Post banner"
                  width={600}
                  height={300}
                  className="object-cover w-full h-full transform transition-transform duration-300 hover:scale-105"
                />
              </Link>
            </div>
          )}
          {<PostAuthor userId={post.userId} />}
          <p className="text-sm text-gray-600 line-clamp-3">
            {post.content.substring(0, 120)}
          </p>
        </CardContent>
      </Card>
    </article>
  );
}
