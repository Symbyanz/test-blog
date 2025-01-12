"use client";

import { Button } from "@/shared/kit/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/shared/kit/select";
import { useState } from "react";
import { toast } from "@/shared/lib/react/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/kit/card";
import {
  useAppDispatch,
  useAppSelector,
} from "@/app/_providers/StoreProvider/config/hooks";
import { selectAllUsers } from "@/entities/user/model/slice";
import { userLoggedIn } from "@/entities/auth/model/slice";
import { redirect } from "next/navigation";

interface SignInFormProps {
  redirectTo?: string;
}

export default function SignInForm({ redirectTo }: SignInFormProps) {
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [isPending, setIsPending] = useState(false);
  const users = useAppSelector(selectAllUsers);
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // move logic to hook/features/auth/model/useSignIn.ts

    if (!selectedUser) {
      toast({
        title: "Validation Error",
        description: "Please select a user to log in.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsPending(true);
      // const formData = new FormData(e.currentTarget);
      // const email = formData.get("email");
      // const password = formData.get("password");

      // const response = await fetch("/api/auth/login", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ email, password }),
      // });

      // if (response.ok) {
      //   dispatch state & redirect
      // } else {
      //   handle error | throw error
      // }

      // Simulate a login process or API call
      toast({
        title: "Login Successful",
        description: `Welcome, ${selectedUser}!`,
        variant: "default",
      });
      dispatch(userLoggedIn(selectedUser));
      if (redirectTo) {
        setTimeout(() => redirect(redirectTo), 1500);
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to log in.",
        variant: "destructive",
      });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Card className="w-full shadow-md">
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="col-span-1">
            <Select
              name="user"
              required
              value={selectedUser}
              onValueChange={(value) => setSelectedUser(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select User" />
              </SelectTrigger>
              <SelectContent>
                {users.map((user) => (
                  <SelectItem key={user.id} value={user.name}>
                    {user.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="col-span-2">
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Logging in..." : "Log In"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
