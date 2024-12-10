"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Todo {
  id: number;
  title: string;
  description: string;
}

export default function TodoListPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState({ title: "", description: "" });
  const router = useRouter();

  // Load dữ liệu từ localStorage
  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    } else {
      // Khởi tạo dữ liệu Todo mặc định
      const defaultTodos = [
        { id: 1, title: "Learn Next.js", description: "Learn how to build SSR apps" },
        { id: 2, title: "Build a Todo App", description: "Practice building a CRUD app" },
      ];
      localStorage.setItem("todos", JSON.stringify(defaultTodos));
      setTodos(defaultTodos);
    }
  }, []);

  // Thêm Todo
  const addTodo = () => {
    if (!newTodo.title.trim() || !newTodo.description.trim()) return;
    const updatedTodos = [
      ...todos,
      {
        id: todos.length + 1,
        title: newTodo.title,
        description: newTodo.description,
      },
    ];
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setNewTodo({ title: "", description: "" });
  };

  // Xóa Todo
  const deleteTodo = (id: number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  // Chuyển sang trang chi tiết
  const viewTodo = (id: number) => {
    router.push(`/todo/${id}`);
  };

  return (
    <div className="min-h-screen p-8 sm:p-20">
      <h1 className="text-3xl font-bold mb-6">Todo List</h1>

      {/* Form thêm Todo */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Title"
          className="border px-4 py-2 mr-2 text-black"
          value={newTodo.title}
          onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          className="border px-4 py-2 mr-2 text-black"
          value={newTodo.description}
          onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={addTodo}
        >
          Add Todo
        </button>
      </div>

      {/* Danh sách Todo */}
      <ul className="list-disc pl-5">
        {todos.map((todo) => (
          <li key={todo.id} className="mb-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold">{todo.title}</h2>
                <p className="text-gray-700">{todo.description}</p>
              </div>
              <div>
                <button
                  className="text-blue-500 hover:underline mr-4"
                  onClick={() => viewTodo(todo.id)}
                >
                  View
                </button>
                <button
                  className="text-red-500 hover:underline"
                  onClick={() => deleteTodo(todo.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
