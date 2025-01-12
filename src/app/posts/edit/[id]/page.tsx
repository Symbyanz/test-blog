"use client";

import { useAppSelector } from "@/app/_providers/StoreProvider/config/hooks";
import { selectCurrentUsername } from "@/entities/auth/model/slice";
import EditPostForm from "@/entities/post/ui/EditPostForm";
import SignInForm from "@/features/auth/ui/SignInForm";

const EditPostPage = () => {
  const username = useAppSelector(selectCurrentUsername);
  return username ? <EditPostForm /> : <SignInForm />;
};

export default EditPostPage;
