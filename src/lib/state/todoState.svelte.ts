import { PUBLIC_API_URL } from '$env/static/public';
import { getContext, setContext } from "svelte";
import type { TodoItemFromBackend } from "$lib/types/todo";
import { AppState, getAppState } from './appState.svelte';


const API_URL = `${PUBLIC_API_URL}/api/todo`;

class TodoState {
    #todos = $state<TodoItemFromBackend[]>([])
    #selectTodo = $state<TodoItemFromBackend | null>(null)
    #loading = $state<boolean>(false);
    #error = $state<string | null>(null);
    #success = $state<string | null>(null);


    constructor(private appState: AppState) { }

    private get token() {
        return this.appState.token
    }

    get todos() {
        return this.#todos
    }

    get loading() {
        return this.#loading;
    }

    get error() {
        return this.#error
    }

    get success() {
        return this.#success;
    }

    set success(value: string | null) {
        this.#success = value;
    }

    get selectTodo(): TodoItemFromBackend | null {
        return this.#selectTodo;
    }

    set selectTodo(todo: TodoItemFromBackend) {
        this.#selectTodo = todo
    }


    async fetchTodos(email: string) {
        this.#loading = true
        this.#error = null

        try {
            const res = await fetch(`${API_URL}/all/${email}`, {
                headers: {
                    "Authorization": `Bearer ${this.token}`
                }
            });
            if (!res.ok) throw new Error(`Error: ${res.status}`);
            const data = await res.json();

            this.#todos = data
        } catch (error: any) {
            console.error('Error fetching todos:', error);
            this.#error = error instanceof Error ? error.message : 'Unknown error';
        } finally {
            this.#loading = false
        }
    }
    async createTodo(text: string, postedBy: string) {
        this.#loading = true
        this.#error = null

        try {
            const res = await fetch(`${API_URL}/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this.token}`
                },
                body: JSON.stringify({ text, postedBy })
            });
            if (!res.ok) throw new Error(`Error: ${res.status}`);
            const newTodo = await res.json()
            this.#success = newTodo.message
            this.#todos = [...this.#todos, newTodo.newPost]
        } catch (error) {
            console.error('Error creating client:', error);
            this.#error = error instanceof Error ? error.message : 'Unknown error';
        } finally {
            this.#loading = false
        }
    }
    async updateTodo(id: string, text: string) {
        this.#loading = true
        this.#error = null
        try {
            const res = await fetch(`${API_URL}/update`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this.token}`
                },
                body: JSON.stringify({ text: text, postId: id })
            });
            if (!res.ok) throw new Error(`Error: ${res.status}`);
            const updatedTodo = await res.json();

            this.#success = updatedTodo.message
            this.#todos = this.#todos.map((todo) => todo._id === id ? updatedTodo.post : todo)
            console.log(this.#todos, "this.#todos")

        } catch (error) {
            console.error('Error creating client:', error);
            this.#error = error instanceof Error ? error.message : 'Unknown error';
        } finally {

        }
        this.#loading = false
    }

    async deleteTodo(id: string) {
        this.#loading = true
        this.#error = null
        try {
            const res = await fetch(`${API_URL}/delete/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${this.token}`
                }
            });
            if (!res.ok) {
                if (!res.ok) throw new Error(`Error: ${res.status}`);
            }
            await res.json();
            this.#success = "Todo deleted successfully"
            this.#todos = this.#todos.filter((todo) => todo._id !== id)

            // alert("success")
        } catch (error: any) {
            console.error('Error creating client:', error);
            this.#error = error instanceof Error ? error.message : 'Unknown error';
        } finally {
            this.#loading = false
        }
    }

    setSelectedTodo(todo: TodoItemFromBackend | null) {
        this.#selectTodo = todo

    }
}

const KEY = Symbol("todoState")

export const createTodoState = (appState: AppState) => {
    const state = new TodoState(appState)
    setContext(KEY, state)
    return state
}

export const getTodoState = (): TodoState => {
    return getContext(KEY)
}