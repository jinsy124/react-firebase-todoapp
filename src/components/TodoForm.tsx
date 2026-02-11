"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { databases, DATABASE_ID, TODOS_COLLECTION_ID } from "@/lib/appwrite";
import { ID, Permission } from "appwrite";

type TodoFormProps = {
  userId: string;
  onTodoAdded: () => void;
};

export default function TodoForm({ userId, onTodoAdded }: TodoFormProps) {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    try {
      if (!title.trim()) {
        alert("Please add a title");
        return;
      }
      console.log("Submitting new todo:", title, "for userId:", userId);
      setLoading(true);
      await databases.createDocument(
        DATABASE_ID,
        TODOS_COLLECTION_ID,
        ID.unique(),
        {
          title,
          completed: false,
          userId: userId,
          createdAt: new Date().toISOString(),
        },
        [
          Permission.read(`user:${userId}`),
          Permission.update(`user:${userId}`),
          Permission.delete(`user:${userId}`)
        ]
              

      );

      setTitle("");
      onTodoAdded(); // this updates ui instantly
    } catch (err) {
      console.error(err);
      alert("Failed to add todo. Please check your Appwrite configuration.");
    } finally {
      setLoading(false);
    }
  };

  if (!userId) {
    return null;
  }

  return (
    <div className="border rounded-lg p-4 shadow-sm w-full max-w-lg mb-3">
      <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
        <Input
          placeholder="Add a new todo..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full"
          disabled={loading}
        />

        <Button
          onClick={onSubmit}
          className="w-full sm:w-auto hover:bg-red-400"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add"}
        </Button>
      </div>
    </div>
  );
}
