// src/stores/todoStore.js
import type { TodoItemFromBackend } from "$lib/types/todo";
import { writable, get } from "svelte/store";
import { token } from "./user";
import { PUBLIC_API_URL } from '$env/static/public';
import { toastStore } from "./toast";


const API_URL = `${PUBLIC_API_URL}/api/todo`;

function createTodoStore() {
    const todos = writable<TodoItemFromBackend[]>([]);
    const loading = writable<boolean>(false);
    const error = writable<string | null>(null);
    const selectTodo = writable<TodoItemFromBackend | null>(null);
    const { showToast } = toastStore()


    // Helper: get token
    function getAuthToken() {
        return get(token);
    }


    // Fetch all todos
    async function fetchTodos(email: string) {

        error.set(null);
        try {
            const res = await fetch(`${API_URL}/all/${email}`, {
                headers: {
                    "Authorization": `Bearer ${getAuthToken()}`
                }
            });
            if (!res.ok) throw new Error(`Error: ${res.status}`);
            const data = await res.json();

            todos.set(data);
        } catch (err: any) {
            error.set(err.message);
        } finally {

        }
    }

    // Create new todo
    async function createTodo(text: string, postedBy: string) {

        try {
            const res = await fetch(`${API_URL}/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${getAuthToken()}`
                },
                body: JSON.stringify({ text, postedBy })
            });
            if (!res.ok) {
                showToast(
                    {
                        title: "Error", description: "Error Occured", type: false
                    }
                )
            } else {
                const newTodo = await res.json();
                showToast(
                    {
                        title: "Success", description: newTodo.message, type: true
                    }
                )
                todos.update(t => [newTodo.newPost, ...t]);
            }

        } catch (err: any) {
            error.set(err.message);
        } finally {

        }
    }

    // Update todo
    async function updateTodo(id: string, text: string) {

        try {
            const res = await fetch(`${API_URL}/update`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${getAuthToken()}`
                },
                body: JSON.stringify({ text: text, postId: id })
            });
            if (!res.ok) {
                showToast(
                    {
                        title: "Error", description: "Error Occured", type: false
                    }
                )
            } else {
                const updatedTodo = await res.json();
                todos.update(t => t.map(todo => todo._id === id ? updatedTodo.post : todo));
                showToast(
                    {
                        title: "Success", description: updatedTodo.message, type: true
                    }
                )
            }

        } catch (err: any) {
            error.set(err.message);
        } finally {

        }
    }

    // Delete todo
    async function deleteTodo(id: string) {

        try {
            const res = await fetch(`${API_URL}/delete/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${getAuthToken()}`
                }
            });
            if (!res.ok) {
                showToast(
                    {
                        title: "Error", description: "Error Occured", type: false
                    }
                )
            } else {
                const todo = await res.json();
                showToast(
                    {
                        title: "Success", description: todo.message, type: true
                    }
                )
                todos.update(t => t.filter(todo => todo._id !== id));
            }

            // alert("success")
        } catch (err: any) {
            error.set(err.message);
        } finally {

        }
    }

    return {
        subscribe: todos.subscribe,
        loading,
        error,
        fetchTodos,
        createTodo,
        updateTodo,
        deleteTodo,
        refetch: fetchTodos, // alias
        selectTodo
    };
}

export const todoStore = createTodoStore();
