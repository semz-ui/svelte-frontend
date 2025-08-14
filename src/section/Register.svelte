<script lang="ts">
  import Button from "../components/Button.svelte";
  import Input from "../components/Input.svelte";
  import { userStore } from "$lib/stores/user";
  import { toastStore } from "$lib/stores/toast";

  let email: string = "";
  let name: string = "";
  let password: string = "";
  let confirmPassword: string = "";

  const { registerUser, loading } = userStore();
  const { showToast } = toastStore();

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      showToast({
        title: "Error",
        description: "Please confirm password",
        type: false,
      });
      return;
    }
    const body = {
      name: name,
      email: email,
      password: password,
    };
    registerUser(body);
  };
</script>

<form class="mt-[100px]" on:submit={handleSubmit}>
  <h2 class="text-center font-semibold text-3xl">Register</h2>
  <div class="flex flex-col gap-4 mt-[20px]">
    <Input placeholder="Name" type="text" bind:value={name} />
    <Input placeholder="Email" type="email" bind:value={email} />
    <Input type="password" placeholder="Password" bind:value={password} />
    <Input
      type="password"
      placeholder="Confirm Password"
      bind:value={confirmPassword}
    />
    <Button name="Submit" onButtonClick={() => {}} isLoading={$loading} />
  </div>
</form>
