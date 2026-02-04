"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { db } from "@/app/lib/firebase";
import { addDoc, collection } from "firebase/firestore";

type TodoFormProps = {
  userId: string;
};

export default function TodoForm({ userId }:TodoFormProps) {
  const [title, setTitle] = useState("");
  const todoCollectionRef = collection(db, "todos");

  const onSubmit = async () => {
    try {
      if (!title.trim()) {
        alert("Please add a title");
        return;
      }

      await addDoc(todoCollectionRef, {
        title,
        completed:false,
        userId: userId,
        createdAt: new Date(),
      });

      setTitle("");
    } catch (err) {
      console.error(err);
    }
  };
  if (!userId) {
    alert("User not authenticated");
    return;
  }

  return (
  <div className="border rounded-lg p-4 shadow-sm w-full max-w-lg mb-3">
    <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
      <Input
        placeholder="Add a new todo..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full"
      />

      <Button
        onClick={onSubmit}
        className="w-full sm:w-auto hover:bg-red-400"
      >
        Add
      </Button>
    </div>
  </div>
);

}
