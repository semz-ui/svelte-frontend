<script lang="ts">
  import Spinner from "./Spinner.svelte";

  let {
    name,
    dataTest,
    isLoading = false,
    onButtonClick,
  }: {
    name: string;
    dataTest: string;
    isLoading: boolean;
    onButtonClick?: () => void;
  } = $props();
</script>

{#if isLoading}
  <div class="w-full flex items-center justify-center"><Spinner /></div>
{:else}
  <button
    onclick={onButtonClick}
    class="button md:text-lg text-xs"
    data-test={dataTest}
  >
    <h4>{name}</h4>
  </button>
{/if}

<style>
  .button {
    min-height: 40px;
    background-color: orange;
    border: 0;
    border-radius: 5px;
    cursor: pointer;
    padding-left: 10px;
    padding-right: 10px;
    color: rgb(13, 12, 12);
  }

  .button:hover {
    opacity: 0.9;
  }
</style>
