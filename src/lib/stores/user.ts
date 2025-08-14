import { goto } from "$app/navigation";
import type { Login, Register, User } from "$lib/types/user";
import { writable } from "svelte/store";
import { PUBLIC_API_URL } from '$env/static/public';


const API_URL = `${PUBLIC_API_URL}/api/users`;

export const user = writable<User | null>(null);
export const token = writable("");



function createUserStore() {
    const loading = writable<boolean>(false);
    async function registerUser(userData: Register) {
        loading.set(true)
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
            user.set(data)
            token.set(data.token)
            goto("/dashboard");
        } catch (error) {
        } finally {
            loading.set(false)
        }
    }

    async function loginUser(userData: Login) {
        loading.set(true)
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
            user.set(data);
            token.set(data.token);
            goto("/dashboard");
        } catch (error) {
        } finally {
            loading.set(false)
        }
    }

    return {
        registerUser,
        loginUser,
        loading
    }
}

export const userStore = createUserStore