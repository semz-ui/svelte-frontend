<script lang="ts">
  let {
    text,
    dataTest,
    handlePageTypeChange,
  }: { handlePageTypeChange: () => void; text: string; dataTest?: string } =
    $props();
</script>

<p
  class="text-center"
  style="cursor: pointer; margin-top: 10px;"
  on:click={handlePageTypeChange}
  data-test={dataTest}
>
  {text}
</p>
