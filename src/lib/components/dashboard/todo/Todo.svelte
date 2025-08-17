<script lang="ts">
  import type { TodoItemFromBackend } from "$lib/types/todo";
  import Spinner from "../../Spinner.svelte";
  import Card from "../../Card.svelte";
  import { getTodoState } from "$lib/state";

  const { todo }: { todo: TodoItemFromBackend } = $props();
  let id = $state<string>("");
  let deleteLoading = $state<boolean>(false);

  const todoState = getTodoState();

  const handleDelete = async (e: Event) => {
    deleteLoading = true;
    e.stopPropagation();
    todoState.setSelectedTodo(null);
    id = todo._id;
    await todoState.deleteTodo(todo._id);
    id = "";
    deleteLoading = false;
  };
</script>

<Card {todo}>
  {#if deleteLoading && id === todo._id}
    <div class="flex justify-end"><Spinner /></div>
  {:else}
    <button
      class="close"
      onclick={(e) => handleDelete(e)}
      data-test="delete-todo-button">X</button
    >
  {/if}
  <p class="text-display text-left" data-test="todo-item">
    {todo.text}
  </p>
</Card>

<style>
  .close {
    position: absolute;
    top: 10px;
    right: 20px;
    cursor: pointer;
    background: none;
    border: none;
  }
</style>
