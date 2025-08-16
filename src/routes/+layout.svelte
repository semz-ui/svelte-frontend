<script lang="ts">
  import "../app.css";
  import { ToastContainer, FlatToast } from "svelte-toasts";
  import favicon from "$lib/assets/favicon.svg";
  import "../index.css";
  import { initializeApp } from "$lib/initializeApp";

  let { children } = $props();
  initializeApp();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<ToastContainer placement="bottom-right" let:data>
  <FlatToast {data} />
</ToastContainer>

{@render children?.()}
