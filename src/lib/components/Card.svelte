<script lang="ts">
  import { getTodoState } from "$lib/state";
  import type { TodoItemFromBackend } from "$lib/types/todo";

  const todoState = getTodoState();

  const props = $props<{ todo: TodoItemFromBackend }>();
  const { todo } = props;
  let selectedTodo = $state<TodoItemFromBackend | null>(null);

  const handleSelectedTodo = () => {
    if (todoState.selectTodo && todoState.selectTodo._id === todo._id) {
      todoState.setSelectedTodo(null);
    } else {
      todoState.setSelectedTodo(todo);
    }
  };
</script>

<button onclick={handleSelectedTodo} class="w-full"
  ><div
    class={todoState.selectTodo && todoState.selectTodo._id === todo._id
      ? "card active-card"
      : "card"}
    data-test="edit-todo"
  >
    <slot></slot>
  </div></button
>

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
