"use client"
import TodoForm from '@/components/TodoForm'
import React, { useEffect, useState } from 'react'
import { db } from "@/app/lib/firebase";
import { getDocs , collection ,onSnapshot ,deleteDoc,doc ,updateDoc,query,where,} from "firebase/firestore";
import { Button } from '@/components/ui/button';
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/app/lib/firebase";
import { ModeToggle } from '@/components/ModeToggle';


type Todo = {
    id: string;
    title: string;
    completed: boolean;
    userId: string;
    
};

const page = () => {

    const { user, loading } = useAuth();
    const router = useRouter();
    const [todoList, setTodoList] = useState<Todo[]>([]);
    
    useEffect(() => {
        if (!loading && !user) {
        router.push("/login");
        }
    }, [user, loading, router]);

    useEffect(() => {
        if (!user) return;

        const q = query(
        collection(db, "todos"),
        where("userId", "==", user.uid)
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
        const todos = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...(doc.data() as Omit<Todo, "id">),
        }));

        setTodoList(todos);
        });

        return () => unsubscribe();
    }, [user]);

    const handleLogout = async () => {
        await signOut(auth);
    };


    const deleteTodo = async (id: string) => {
        try {
            const todoDoc = doc(db, "todos", id);
            await deleteDoc(todoDoc);

            // Update UI without refetching
            
        } catch (err) {
            console.error("Error deleting todo:", err);
        }
    };

    const toggleTodoStatus = async (id: string, completed: boolean) => {
        try {
            const todoDoc = doc(db, "todos", id);

            await updateDoc(todoDoc, {
            completed: !completed,
            });

            
        } catch (err) {
            console.error("Error updating status:", err);
        }
    };
    if (loading) return <p className="text-center">Loading...</p>;
    if (!user) return null;



  return (
    <div >
        <main className="mx-auto max-w-sm p-3 sm:max-w-md sm:p-4 md:max-w-lg">
            <div className='flex-col items-center justify-center border-3  p-2 rounded shadow '>
            <div className='flex items-end justify-end'>
                <ModeToggle />
            </div>
            <h1 className='text-2xl font-serif text-center mb-4'>To-Do-List</h1>
            
            <Button variant="destructive" size="sm" onClick={handleLogout} className="w-full sm:w-auto sm:ml-auto mb-4 bg-cyan-700  ">
                Logout
            </Button>
            
            <TodoForm  userId={user.uid}/>
            
            
            <div className='text-center space-y-3 '>
                {todoList
                    .sort((a, b) => Number(a.completed) - Number(b.completed))
                    .map((todo) =>(
                    <div key={todo.id} 
                    className="
                        border rounded p-3
                        flex flex-col gap-3
                        sm:flex-row sm:items-center sm:justify-between
                        "
                    >
                        <div className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                checked={todo.completed}
                                onChange={() => toggleTodoStatus(todo.id, todo.completed)}
                                className="h-4 w-4 cursor-pointer"
                            />
                            <span
                                className={`text-sm ${
                                todo.completed ? "line-through text-gray-400" : ""
                                }`}
                            >
                                {todo.title}
                            </span>
                        </div>
                        <Button variant="destructive" size="sm" 
                            className="w-full sm:w-auto bg-green-700"
                            onClick={() => deleteTodo(todo.id)}>
                                Delete 

                        </Button>
                    </div>
                ))}
            </div>
            </div>
            
        </main>
    </div>
  )
}

export default page
