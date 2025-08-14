<script lang="ts">
  import BottomText from "../components/BottomText.svelte";
  import Login from "../section/Login.svelte";
  import Register from "../section/Register.svelte";

  let page_type = "login";

  const handlePageTypeChange = () => {
    page_type = page_type === "login" ? "register" : "login";
  };
</script>

<main class="main">
  <div class="w-full h-full flex items-center justify-center">
    {#if page_type === "login"}
      <Login />
    {:else}
      <Register />
    {/if}
  </div>
  {#if page_type === "login"}
    <BottomText
      text={"Don't have an account? SignUp"}
      {handlePageTypeChange}
      dataTest="register-text"
    />
  {:else}
    <BottomText
      text={"Have an account? Login"}
      {handlePageTypeChange}
      dataTest="login-text"
    />
  {/if}
</main>

<style>
  .main {
    margin-left: 40px;
    margin-right: 40px;
    position: relative;
  }
</style>
