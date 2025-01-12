import { Button } from "@/shared/kit/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/shared/kit/dialog";
import { PencilIcon, TrashIcon } from "lucide-react";
import { useState } from "react";
import { useAppDispatch } from "@/app/_providers/StoreProvider/config/hooks";
import { redirect } from "next/navigation";
import { postRemoved } from "@/entities/post/model/slice";
import { Post } from "@/entities/post/model/types";

interface SinglePostButtonsProps {
  post: Post;
}

export default function SinglePostButtons({ post }: SinglePostButtonsProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const dispatch = useAppDispatch();

  const handleRemove = () => {
    if (!post) return;
    dispatch(postRemoved(post.id));
    redirect("/posts");
  };

  const handleEdit = () => {
    if (!post) return;
    redirect(`/posts/edit/${post.id}`);
  };

  return (
    <div className="flex gap-4 justify-center md:justify-start">
      <Button
        onClick={handleEdit}
        variant="outline"
        className="flex items-center gap-2"
      >
        <PencilIcon className="w-5 h-5" />
        Edit
      </Button>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <TrashIcon className="w-5 h-5" />
            Remove
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle className="sr-only">
            Delete post confirmation
          </DialogTitle>
          <h3 className="text-lg font-semibold text-gray-800">
            Are you sure you want to delete this post?
          </h3>
          <DialogFooter className="md:justify-center">
            <Button onClick={() => setIsDialogOpen(false)} variant="secondary">
              Cancel
            </Button>
            <Button onClick={handleRemove} variant="destructive">
              Yes, Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
