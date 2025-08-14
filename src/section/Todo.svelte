<script lang="ts">
  import Card from "../components/Card.svelte";
  import type { TodoItemFromBackend } from "$lib/types/todo";
  import { todoStore } from "$lib/stores/todo";
  import Spinner from "../components/Spinner.svelte";

  //   const dispatch = createEventDispatcher();
  export let todo: TodoItemFromBackend;
  const { deleteTodo, selectTodo } = todoStore;
  let id: string;
  let deleteLoading: boolean = false;

  const handleDelete = async (e: Event) => {
    deleteLoading = true;
    e.stopPropagation();
    selectTodo.set(null);
    id = todo._id;
    await deleteTodo(todo._id);
    id = "";
    deleteLoading = false;
  };
</script>

<Card {todo}>
  <!-- <div class="num-display">{todo.rating}</div> -->
  {#if deleteLoading && id === todo._id}
    <div class="flex justify-end"><Spinner /></div>
  {:else}
    <button
      class="close"
      on:click={(e) => handleDelete(e)}
      data-test="delete-todo-button">X</button
    >
  {/if}
  <p class="text-display" data-test="todo-item">{todo.text}</p>
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
