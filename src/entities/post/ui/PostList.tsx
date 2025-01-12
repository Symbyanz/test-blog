"use client";

import {
  useAppDispatch,
  useAppSelector,
} from "@/app/_providers/StoreProvider/config/hooks";

import { useEffect } from "react";
import { loadPostsAsync, selectAllPosts } from "../model/slice";
import NotFoundBadge from "@/shared/ui/NotFoundBadge";
import ErrorBadge from "@/shared/ui/ErrorBadge";
import PostItem from "./PostItem";

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
    return <ErrorBadge title="Error" description={error} />;
  }

  if (!posts.length) {
    return (
      <NotFoundBadge
        title="Posts not found!"
        description="Sorry, the posts you're looking for are not available."
      />
    );
  }

  const orderedPosts = posts
    .slice()
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {orderedPosts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
}
