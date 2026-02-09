"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { account } from "@/lib/appwrite";
import { ID } from "appwrite";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async () => {
    try {
      await account.create(ID.unique(), email, password);
      // Log in the user after signup
      await account.createEmailPasswordSession(email, password);
      router.push("/todos");
    } catch (err: any) {
      const message = err.message || err;

      if (message.includes("already in use") || message.includes("email")) {
        setError("This email is already registered. Please log in.");
      } else {
        setError("Sign up failed. Please try again.");
      }
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="font-serif text-center">Sign Up</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4 ">
          <input
            className="w-full border p-2 rounded"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="w-full border p-2 rounded"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}

          <Button className="w-full" onClick={handleSignup}>
            Create Account
          </Button>

          <p className="text-sm text-center">
            Already have an account?{" "}
            <Link href="/login" className="underline">
              Login
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
