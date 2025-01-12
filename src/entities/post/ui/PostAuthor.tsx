import { useAppSelector } from "@/app/_providers/StoreProvider/config/hooks";
import { selectUserById } from "@/entities/user/model/slice";

interface PostAuthorProps {
  userId: string;
}
export default function PostAuthor({ userId }: PostAuthorProps) {
  const author = useAppSelector((state) => selectUserById(state, userId));
  return (
    <span className="font-medium text-gray-400">
      {author?.name ?? "Unknown author"}
    </span>
  );
}
