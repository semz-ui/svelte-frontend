<script lang="ts">
  import Todos from "../../section/Todos.svelte";
  import Input from "../../components/Input.svelte";
  import Button from "../../components/Button.svelte";
  import { todoStore } from "$lib/stores/todo";
  import { afterNavigate, goto } from "$app/navigation";
  import { get } from "svelte/store";
  import { onMount } from "svelte";
  import type { TodoItemFromBackend } from "$lib/types/todo";
  import Spinner from "../../components/Spinner.svelte";
  import { toastStore } from "$lib/stores/toast";
  import { token, user } from "$lib/stores/user";
  import type { User } from "$lib/types/user";

  let currentUser: User | null; // current user logged in
  let authToken: string; // jwt token stored for access to protected api calls
  let text: string; // input value stored
  let selectedTodo: TodoItemFromBackend | null = null;

  const { createTodo, loading, fetchTodos, selectTodo, updateTodo } = todoStore;
  const { showToast } = toastStore();

  currentUser = get(user);
  authToken = get(token);
  selectTodo.subscribe((value) => {
    selectedTodo = value;
  });
  let fetchLoading: boolean = false;
  let createLoading: boolean = false;
  let updateLoading: boolean = false;

  $: if (selectedTodo) {
    text = selectedTodo?.text ?? "";
  } else {
    text = "";
  }

  onMount(async () => {
    fetchLoading = true;
    await fetchTodos(currentUser?.email ?? "");
    fetchLoading = false;
  });

  afterNavigate(() => {
    if (currentUser === null) {
      goto("/");
    }
  });

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCreatePost();
    }
  };

  const handleCreatePost = async () => {
    if (text === "") {
      showToast({
        title: "Error",
        type: false,
        description: "Please add a todo",
      });
      return;
    }
    if (selectedTodo) {
      updateLoading = true;
      await updateTodo(selectedTodo?._id, text);
      text = "";
      selectTodo.set(null);
      updateLoading = false;
    } else {
      createLoading = true;
      await createTodo(text, currentUser?._id ?? "");
      text = "";
      createLoading = false;
    }
  };

  const handleLogout = async () => {
    user.set(null);
    token.set("");
    goto("/");
  };
</script>

<div>
  <div style="padding-right: 20px;">
    <button
      on:click={handleLogout}
      style="background: none; border: none; color: inherit; cursor: pointer; width: 100%;"
      data-test="logout-button"
    >
      <h3 class="text-right" style="cursor: pointer;">Logout</h3>
    </button>
    <div class="flex flex-col items-center">
      <div class="max-w-[720px] mx-[60px]">
        <h2 class="text-center my-[40px] font-semibold text-3xl">
          Welcome back {currentUser?.name}
        </h2>
        {#if fetchLoading}
          <div class="flex justify-center w-full"><Spinner /></div>
        {:else}
          <div>
            <div class="flex justify-center gap-2 w-full">
              <Input
                placeholder="Add todo"
                type="text"
                bind:value={text}
                dataTest="todo-input"
                onKeyPress={handleKeyDown}
              />
              <Button
                name={selectedTodo ? "Edit Todo" : "Add Todo"}
                onButtonClick={handleCreatePost}
                isLoading={updateLoading || createLoading}
                dataTest="todo-button"
              />
            </div>
            <Todos todos={$todoStore} />
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>
