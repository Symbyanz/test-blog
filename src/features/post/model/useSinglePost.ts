import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/app/_providers/StoreProvider/config/hooks";
import { loadPostsAsync } from "@/entities/post/model/slice";
import { selectCurrentUsername } from "@/entities/auth/model/slice";
import { usePosts } from "./usePosts";

export function useSinglePost() {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const { posts, loading, error, hasLoaded } = usePosts();
    const username = useAppSelector(selectCurrentUsername);

    useEffect(() => {
        if (!hasLoaded) {
            dispatch(loadPostsAsync());
        }
    }, [dispatch, hasLoaded]);

    const post = posts.find((post) => post.id === id);

    return { post, loading, error, username };
}