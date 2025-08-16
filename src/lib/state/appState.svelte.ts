import type { Login, User } from "$lib/types/user";
import { PUBLIC_API_URL } from '$env/static/public';
import { getContext, setContext } from "svelte";
import { goto } from "$app/navigation";


const API_URL = `${PUBLIC_API_URL}/api/users`;

export class AppState {
    #user = $state<User | null>(null)
    #loading = $state<boolean>(false);
    #error = $state<string | null>(null);
    #token = $state<string | null>(null);

    constructor() { }

    get user() {
        return this.#user
    }
    get token() {
        return this.#token
    }

    get loading() {
        return this.#loading;
    }

    get error() {
        return this.#error
    }


    async registerUser(userData: Login) {
        this.#loading = true;
        this.#error = null;

        try {
            const response = await fetch(`${API_URL}/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const data = await response.json();
            this.#user = data
            this.#token = data.token
            localStorage.setItem("token", data.token)
            goto("/dashboard")
        } catch (error) {
            console.error('Error registering user:', error);
            this.#error = error instanceof Error ? error.message : 'Unknown error';
        } finally {
            this.#loading = false;
        }
    }
    async loginUser(userData: Login) {
        this.#loading = true;
        this.#error = null;

        try {
            const response = await fetch(`${API_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const data = await response.json();
            this.#user = data
            this.#token = data.token
            goto("/dashboard")
        } catch (error) {
            console.error('Error registering user:', error);
            this.#error = error instanceof Error ? error.message : 'Unknown error';
        } finally {
            this.#loading = false;
        }
    }

    async logout() {
        this.#user = null
        this.#token = null
        goto("/auth")
    }
}

const KEY = Symbol("appState")

export const createAppState = () => {
    const state = new AppState();
    setContext(KEY, state);
    return state;
};

export const getAppState = (): AppState => {
    return getContext(KEY);
};