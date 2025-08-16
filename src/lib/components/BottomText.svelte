<script lang="ts">
  //  let { handlePageTypeChange } = $props();
  export let handlePageTypeChange: () => void;
  export let text;
  export let dataTest: string = "";
</script>

<p
  class="text-center"
  style="cursor: pointer; margin-top: 10px;"
  on:click={handlePageTypeChange}
  data-test={dataTest}
>
  {text}
</p>
