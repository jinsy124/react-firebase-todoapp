"use client"
import TodoForm from '@/components/TodoForm'
import React, { useEffect, useState } from 'react'
import { account, databases, DATABASE_ID, TODOS_COLLECTION_ID, Query } from "@/lib/appwrite";
import { Button } from '@/components/ui/button';
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { ModeToggle } from '@/components/ModeToggle';


type Todo = {
    $id: string;
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

        const fetchTodos = async () => {
            try {
                const response = await databases.listDocuments(
                    DATABASE_ID,
                    TODOS_COLLECTION_ID,
                    [Query.equal("userId", user.$id)]
                );
                setTodoList(response.documents as Todo[]);
            } catch (err) {
                console.error("Error fetching todos:", err);
            }
        };

        fetchTodos();
    }, [user]);

    const handleLogout = async () => {
        try {
            await account.deleteSession("current");
            router.push("/login");
        } catch (err) {
            console.error("Error logging out:", err);
        }
    };


    const deleteTodo = async (id: string) => {
        try {
            await databases.deleteDocument(DATABASE_ID, TODOS_COLLECTION_ID, id);
            // Update UI
            setTodoList(todoList.filter(todo => todo.$id !== id));
        } catch (err) {
            console.error("Error deleting todo:", err);
        }
    };

    const toggleTodoStatus = async (id: string, completed: boolean) => {
        try {
            await databases.updateDocument(DATABASE_ID, TODOS_COLLECTION_ID, id, {
                completed: !completed,
            });
            // Update UI
            setTodoList(todoList.map(todo => 
                todo.$id === id ? { ...todo, completed: !completed } : todo
            ));
        } catch (err) {
            console.error("Error updating status:", err);
        }
    };
    if (loading) return <p className="text-center">Loading...</p>;
    if (!user) return null;



    return (
    
        <main className="mx-auto max-w-sm p-3 sm:max-w-md sm:p-4 md:max-w-lg">
            <div className="border-2 p-4 rounded shadow">
                <div className="relative flex flex-col sm:flex-row sm:items-center mb-4 gap-2">
      
                    {/* Heading */}
                    <h1 className="text-2xl font-serif text-center sm:absolute sm:left-1/2 sm:-translate-x-1/2">
                        To-Do-List
                    </h1>

                    {/* Logout button */}
                    <Button
                        variant="default"
                        size="sm"
                        onClick={handleLogout}
                        className="w-full sm:w-auto sm:ml-auto bg-cyan-700"
                    >
                        Logout
                    </Button>

                </div>

            
            <TodoForm  userId={user.$id}/>
            
            
            <div className='text-center space-y-3 '>
                {todoList
                    .sort((a, b) => Number(a.completed) - Number(b.completed))
                    .map((todo) =>(
                    <div key={todo.$id} 
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
                                onChange={() => toggleTodoStatus(todo.$id, todo.completed)}
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
                            className="w-full sm:w-auto hover:bg-green-700"
                            onClick={() => deleteTodo(todo.$id)}>
                                Delete 

                        </Button>
                    </div>
                ))}
            </div>
            
            </div>
        </main>
    
    )
}

export default page
