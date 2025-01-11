"use client";

import Image from "next/image";
import {
  useAppDispatch,
  useAppSelector,
} from "@/app/_providers/StoreProvider/config/hooks";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/kit/card";
import Link from "next/link";
import { useEffect } from "react";
import { loadPostsAsync, selectAllPosts } from "../model/slice";

export function PostList() {
  const dispatch = useAppDispatch();
  const { posts, loading, error, hasLoaded } = useAppSelector(selectAllPosts);

  useEffect(() => {
    if (!hasLoaded && posts.length === 0) {
      dispatch(loadPostsAsync());
    }
  }, [dispatch, posts.length, hasLoaded]);

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="p-4 bg-gray-300 animate-pulse rounded-md">
            <div className="h-4 bg-gray-500 mb-2"></div>
            <div
              className="w-full bg-gray-500 mb-2"
              style={{ aspectRatio: "2 / 1" }}
            ></div>
            <div className="h-8 bg-gray-500"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <section className="flex flex-col items-center justify-center p-6 bg-red-100 rounded-lg shadow-md text-center">
        <h2 className="text-lg font-semibold text-red-700">Error</h2>
        <p className="text-sm text-red-600">{error}</p>
      </section>
    );
  }

  if (!posts.length) {
    return (
      <section className="flex flex-col items-center justify-center p-6 bg-yellow-100 rounded-lg shadow-md text-center">
        <h2 className="text-lg font-semibold text-yellow-700">
          Post not found!
        </h2>
        <p className="text-sm text-yellow-600">
          Sorry, the post you&apos;re looking for is not available.
        </p>
      </section>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <article key={post.id}>
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
              <p className="text-sm text-gray-600 line-clamp-3">
                {post.content.substring(0, 120)}
              </p>
            </CardContent>
          </Card>
        </article>
      ))}
    </div>
  );
}
