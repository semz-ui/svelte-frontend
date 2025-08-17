<script lang="ts">
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import type { TodoItemFromBackend } from "$lib/types/todo";
  import { toastStore } from "$lib/stores/toast";
  import type { User } from "$lib/types/user";
  import Spinner from "$lib/components/Spinner.svelte";
  import Input from "$lib/components/Input.svelte";
  import Button from "$lib/components/Button.svelte";
  import Todos from "$lib/components/dashboard/todo/Todos.svelte";
  import Title from "../Title.svelte";
  import { getAppState, getTodoState } from "$lib/state";

  let text = $state<string>("");
  let fetchLoading = $state<boolean>(false);
  let createLoading = $state<boolean>(false);
  let updateLoading = $state<boolean>(false);

  const { showToast } = toastStore();
  const todoState = getTodoState();
  const appState = getAppState();

  $effect(() => {
    if (todoState.selectTodo) {
      text = todoState.selectTodo?.text ?? "";
    } else {
      text = "";
    }
  });

  //fix

  let currentUser: User | null = $derived(appState.user);
  let todos: TodoItemFromBackend[] = $derived(todoState.todos);

  onMount(async () => {
    fetchLoading = true;
    await todoState.fetchTodos(currentUser?.email ?? "");
    fetchLoading = false;
  });
  $effect(() => {
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
    if (todoState.selectTodo) {
      updateLoading = true;
      await todoState.updateTodo(todoState.selectTodo?._id, text);
      todoState.setSelectedTodo(null);
      text = "";
      updateLoading = false;
    } else {
      createLoading = true;
      await todoState.createTodo(text, currentUser?._id ?? "");
      text = "";
      createLoading = false;
    }
  };

  $effect(() => {
    console.log(todoState, "op");
  });

  const handleLogout = async () => {
    appState.logout();
    goto("/");
  };
</script>

<div>
  <div>
    <!-- <button
      onclick={handleLogout}
      style="background: none; border: none; color: inherit; cursor: pointer; width: 100%;"
      data-test="logout-button"
    >
      <h3 class="text-right" style="cursor: pointer;">Logout</h3>
    </button> -->
    <div class="flex justify-end mr-[10px]">
      <Button
        dataTest="logout-button"
        isLoading={false}
        name={"Logout"}
        onButtonClick={handleLogout}
      />
    </div>
    <div class="flex flex-col items-center">
      <div class="max-w-[720px]">
        <Title title={`Welcome back ${currentUser?.name}`} />
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
                name={todoState.selectTodo ? "Edit Todo" : "Add Todo"}
                onButtonClick={handleCreatePost}
                isLoading={updateLoading || createLoading}
                dataTest="todo-button"
              />
            </div>
            <Todos {todos} />
          </div>
        {/if}
      </div>
    </div>
  </div>
</div>
