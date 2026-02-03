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
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center ">
      <Input
        placeholder="Add a new todo..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full"
      />

      <Button
        onClick={onSubmit}
        className="w-full sm:w-auto mb-3"
      >
        Add
      </Button>
    </div>
  );
}
