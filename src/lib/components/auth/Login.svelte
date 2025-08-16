<script lang="ts">
  import type { Login, User } from "$lib/types/user";
  import Input from "../Input.svelte";
  import Button from "../Button.svelte";
  import { getAppState } from "$lib/state";
  import Title from "../Title.svelte";
  import { toastStore } from "$lib/stores/toast";
  import { goto } from "$app/navigation";

  let email = $state<string>("");
  let password = $state<string>("");
  let loading = $state<boolean>(false);
  let user = $state<User | null>(null);

  const appState = getAppState();
  const { showToast } = toastStore();

  user = appState.user;

  $effect(() => {
    if (user !== null) {
      goto("/dashboard");
    }
  });
  const handleSubmit = async (e: SubmitEvent) => {
    if (loading) return;
    if (email === "" || password === "") {
      showToast({
        title: "Error",
        description: "Please fill up all details",
        type: false,
      });
      return;
    }
    loading = true;

    e.preventDefault();
    const body: Login = {
      email: email,
      password: password,
    };
    await appState.loginUser(body);
    loading = false;
  };
</script>

<form class="mt-[100px]" onsubmit={handleSubmit}>
  <Title title={`Login`} />
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
      isLoading={loading}
      dataTest="login-button"
    />
  </div>
</form>
