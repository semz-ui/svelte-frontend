<script lang="ts">
  import type { TodoItemFromBackend } from "$lib/types/todo";
  import Todo from "./Todo.svelte";

  export let todos: TodoItemFromBackend[];

  console.log(JSON.stringify(todos), "todos");
</script>

<div>
  {#if todos && todos.length > 0}
    {#each todos as todo (todo._id)}
      <Todo {todo} />
    {/each}
  {:else}
    <h3 class="text-center">Please add a task</h3>
  {/if}
</div>
