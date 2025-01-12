import {
    useAppDispatch,
    useAppSelector,
} from "@/app/_providers/StoreProvider/config/hooks";
import React, { useState } from "react";
import { toast } from "@/shared/lib/react/use-toast";
import { selectAllUsers } from "@/entities/user/model/slice";
import { postAdded } from "@/entities/post/model/slice";

const useAddPost = () => {
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

    return {
        handleSubmit,
        isPending,
        users,
        handleImageChange
    }
}
export default useAddPost;