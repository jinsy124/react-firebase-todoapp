"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { account } from "@/lib/appwrite";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      await account.createEmailPasswordSession(email, password);
      router.push("/todos");
    } catch (err: any) {
      const message = err.message || err;

      if (message.includes("not found") || message.includes("invalid")) {
        setError("Account not found or password incorrect. Please check your credentials.");
      } else if (message.includes("email")) {
        setError("Please enter a valid email address.");
      } else {
        setError("Login failed. Please try again.");
      }
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md sm:max-w-lg">
        <CardHeader>
          <CardTitle className="font-serif text-center">Login</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4 px-2 sm:px-4">
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

          <Button className="w-full " onClick={handleLogin}>
            Login
          </Button>

          <p className="text-sm text-center">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="underline">
              Sign up
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
