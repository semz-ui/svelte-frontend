<script lang="ts">
  import "../app.css";
  import { ToastContainer, FlatToast } from "svelte-toasts";
  import favicon from "$lib/assets/favicon.svg";
  import "../index.css";
  
  let { children } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<ToastContainer placement="bottom-right" let:data>
  <FlatToast {data} />
  <!-- Provider template for your toasts -->
</ToastContainer>

{@render children?.()}
