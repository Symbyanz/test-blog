import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/_providers/StoreProvider/config/hooks";
import { loadPostsAsync, selectAllPosts } from "@/entities/post/model/slice";

export const usePosts = () => {
    const dispatch = useAppDispatch();
    const { posts, loading, error, hasLoaded } = useAppSelector(selectAllPosts);

    useEffect(() => {
        if (!hasLoaded) {
            dispatch(loadPostsAsync());
        }
    }, [dispatch, hasLoaded]);

    return { posts, loading, error, hasLoaded };
};
