<script lang="ts">
  import { todoStore } from "$lib/stores/todo";
  import type { TodoItemFromBackend } from "$lib/types/todo";

  const { selectTodo } = todoStore;

  export let todo: TodoItemFromBackend;
  let selectedTodo: TodoItemFromBackend | null = null;

  const handleSelectedTodo = () => {
    if (selectedTodo && selectedTodo._id === todo._id) {
      selectTodo.set(null);
    } else {
      selectTodo.set(todo);
    }
  };
  selectTodo.subscribe((value) => {
    selectedTodo = value;
  });
</script>

<div
  class={selectedTodo && selectedTodo._id === todo._id
    ? "card active-card"
    : "card"}
  on:click={handleSelectedTodo}
  data-test="edit-todo"
>
  <slot></slot>
</div>

<style>
  .card {
    background-color: #fff;
    color: #333;
    border-radius: 15px;
    padding: 20px 30px;
    margin: 20px 0;
    position: relative;
    cursor: pointer;
  }

  .active-card {
    opacity: 0.7;
  }
</style>
