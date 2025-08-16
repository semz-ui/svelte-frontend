<script lang="ts">
  import Button from "$lib/components/Button.svelte";
  import Input from "$lib/components/Input.svelte";
  import { toastStore } from "$lib/stores/toast";
  import Title from "../Title.svelte";
  import { getAppState } from "$lib/state";

  let name = $state<string>("");
  let email = $state<string>("");
  let password = $state<string>("");
  let confirmPassword = $state<string>("");
  let loading = $state<boolean>(false);
  const appState = getAppState();
  const { showToast } = toastStore();

  const handleSubmit = async (e: SubmitEvent) => {
    if (loading) return;
    if (
      name === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      showToast({
        title: "Error",
        description: "Please fill up all details",
        type: false,
      });
      return;
    }
    loading = true;
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
    await appState.registerUser(body);
    loading = false;
  };
</script>

<form class="mt-[100px]" onsubmit={handleSubmit}>
  <Title title={`Register`} />
  <div class="flex flex-col gap-4 mt-[20px]">
    <Input placeholder="Name" type="text" bind:value={name} />
    <Input placeholder="Email" type="email" bind:value={email} />
    <Input type="password" placeholder="Password" bind:value={password} />
    <Input
      type="password"
      placeholder="Confirm Password"
      bind:value={confirmPassword}
    />
    <Button name="Submit" onButtonClick={() => {}} isLoading={loading} />
  </div>
</form>
