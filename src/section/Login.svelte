<script lang="ts">
  import { onMount, setContext } from "svelte";
  import Button from "../components/Button.svelte";
  import Input from "../components/Input.svelte";
  import { afterNavigate, goto } from "$app/navigation";
  import { token, user, userStore } from "$lib/stores/user";
  import { redirect } from "@sveltejs/kit";
  import type { User } from "$lib/types/user";
  import { get } from "svelte/store";
  import { page } from "$app/stores";

  let email: string = "";
  let password: string = "";

  const { loginUser, loading } = userStore();

  let currentUser: User | null;
  let authToken: string;

  currentUser = get(user);

  afterNavigate(() => {
    const path = $page.url.pathname;

    if (currentUser !== null) {
      goto("/dashboard");
    }
  });
  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    const body = {
      email: email,
      password: password,
    };
    loginUser(body);
  };
</script>

<form class="mt-[100px]" on:submit={handleSubmit}>
  <h2 class="text-center font-semibold text-3xl">Login</h2>
  <div class="flex flex-col gap-4 mt-[20px]">
    <Input
      placeholder="Email"
      type="email"
      bind:value={email}
      dataTest="login-email"
    />
    <Input
      type="password"
      placeholder="Password"
      bind:value={password}
      dataTest="login-password"
    />
    <Button
      name="Submit"
      onButtonClick={() => {}}
      isLoading={$loading}
      dataTest="login-button"
    />
  </div>
</form>
