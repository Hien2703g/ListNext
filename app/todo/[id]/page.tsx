"use client";

import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function TodoDetailPage() {
    const { id } = useParams(); // Lấy id từ URL
    const router = useRouter();
    const [todo, setTodo] = useState<{ id: number; title: string; description: string } | null>(
        null
    );
    const [editedTodo, setEditedTodo] = useState({ title: "", description: "" });

    // Load dữ liệu Todo từ localStorage
    useEffect(() => {
        const storedTodos = localStorage.getItem("todos");
        if (storedTodos) {
            const todos = JSON.parse(storedTodos);
            const currentTodo = todos.find((t: any) => t.id === Number(id));
            if (currentTodo) {
                setTodo(currentTodo);
                setEditedTodo({ title: currentTodo.title, description: currentTodo.description });
            }
        }
    }, [id]);

    // Lưu thay đổi
    const saveChanges = () => {
        const storedTodos = localStorage.getItem("todos");
        if (storedTodos) {
            const todos = JSON.parse(storedTodos);
            const updatedTodos = todos.map((t: any) =>
                t.id === Number(id) ? { ...t, ...editedTodo } : t
            );
            localStorage.setItem("todos", JSON.stringify(updatedTodos));
            router.push("/");
        }
    };

    if (!todo) {
        return <div>Todo not found.</div>;
    }

    return (
        <div className="min-h-screen p-8 sm:p-20">
            <h1 className="text-3xl font-bold mb-6">Todo Detail</h1>
            <div className="mb-6">
                <label className="block mb-2 font-medium">Title</label>
                <input
                    type="text"
                    className="border px-4 py-2 w-full mb-4 text-black"
                    value={editedTodo.title}
                    onChange={(e) => setEditedTodo({ ...editedTodo, title: e.target.value })}
                />
                <label className="block mb-2 font-medium">Description</label>
                <textarea
                    className="border px-4 py-2 w-full text-black"
                    value={editedTodo.description}
                    onChange={(e) => setEditedTodo({ ...editedTodo, description: e.target.value })}
                ></textarea>
            </div>
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={saveChanges}
            >
                Save Changes
            </button>
            <button
                className="text-gray-500 underline ml-4"
                onClick={() => router.push("/")}
            >
                Cancel
            </button>
        </div>
    );
}
