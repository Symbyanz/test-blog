import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useAppDispatch } from "@/app/_providers/StoreProvider/config/hooks";
import { postUpdated } from "@/entities/post/model/slice";
import { toast } from "@/shared/lib/react/use-toast";
import { usePosts } from "./usePosts";

const useEditPost = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("");
    const [banner, setBanner] = useState<File | null>(null);
    const [isPending, setIsPending] = useState(false);

    const { id } = useParams();
    const dispatch = useAppDispatch();
    const { posts, loading, error, hasLoaded } = usePosts();

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
                description: "Failed to update the post.",
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

    const notFound = hasLoaded && !posts.find((post) => post.id === id);

    return {
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
    };
};
export default useEditPost;