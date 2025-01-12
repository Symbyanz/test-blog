"use client";

import { useAppSelector } from "@/app/_providers/StoreProvider/config/hooks";
import { selectCurrentUsername } from "@/entities/auth/model/slice";
import SignInForm from "@/features/auth/ui/SignInForm";
import EditPostForm from "@/features/post/ui/EditPostForm";

const EditPostPage = () => {
  const username = useAppSelector(selectCurrentUsername);
  return username ? <EditPostForm /> : <SignInForm />;
};

export default EditPostPage;
