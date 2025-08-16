<script lang="ts">
  let {
    type,
    placeholder,
    dataTest = "",
    onKeyPress = () => {},
    value = $bindable<string>(""),
  }: {
    type: string;
    placeholder: string;
    value: string;
    dataTest: string;
    onKeyPress?: (e: KeyboardEvent) => void;
  } = $props();
  let sub_type = $state<string>("");
  sub_type = type;
  const handleTypeChange: () => void = () => {
    sub_type === "password" ? (sub_type = "text") : (sub_type = "password");
  };
</script>

<div class="input-container">
  <input
    {placeholder}
    type={sub_type}
    bind:value
    class="input"
    data-test={dataTest}
    onkeypress={onKeyPress}
    onchange={(e) => {
      value = (e.target as HTMLInputElement).value;
    }}
  />
  {#if type === "password"}
    {#if sub_type === "password"}
      <button
        onclick={handleTypeChange}
        type="button"
        style="cursor: pointer; background: none; border: none; padding: 0;"
        aria-label="Toggle password visibility"
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          ><path
            fill="white"
            fill-rule="evenodd"
            d="M22.295 6.31a.75.75 0 0 1 .394.986L22 7l.69.296v.001l-.002.003l-.003.007l-.01.024l-.039.084a14 14 0 0 1-.727 1.321a15 15 0 0 1-1.846 2.394l.968.969a.75.75 0 0 1-1.06 1.06l-1.001-1a11.6 11.6 0 0 1-2.274 1.497l.934 1.435a.75.75 0 1 1-1.258.818l-1.089-1.674c-.78.255-1.623.428-2.532.49V16.5a.75.75 0 0 1-1.5 0v-1.775a10.5 10.5 0 0 1-2.46-.466l-1.074 1.65a.75.75 0 1 1-1.258-.818l.913-1.402a11.5 11.5 0 0 1-2.293-1.49l-.96.96a.75.75 0 0 1-1.061-1.06l.924-.924A15 15 0 0 1 1.514 7.72a10 10 0 0 1-.188-.388l-.01-.025l-.004-.007v-.003H1.31L2 7l-.69.296a.75.75 0 0 1 1.379-.592v.002l.007.014l.029.063q.04.086.125.255a13.3 13.3 0 0 0 2.706 3.584c.866.805 1.927 1.546 3.196 2.034A9 9 0 0 0 12 13.25a9 9 0 0 0 3.312-.619c1.262-.497 2.316-1.243 3.175-2.049a13.3 13.3 0 0 0 2.789-3.8l.028-.063l.006-.013v-.001m.985-.394a.75.75 0 0 0-.984.394zM2.69 6.704"
            clip-rule="evenodd"
          /></svg
        ></button
      >
    {:else}
      <button
        type="button"
        onclick={handleTypeChange}
        style="cursor: pointer; background: none; border: none; padding: 0;"
        aria-label="Toggle password visibility"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          style="color: white;"
          ><path
            fill="white"
            d="M2 12c0 1.64.425 2.191 1.275 3.296C4.972 17.5 7.818 20 12 20s7.028-2.5 8.725-4.704C21.575 14.192 22 13.639 22 12c0-1.64-.425-2.191-1.275-3.296C19.028 6.5 16.182 4 12 4S4.972 6.5 3.275 8.704C2.425 9.81 2 10.361 2 12"
            opacity="0.5"
          /><path
            fill="white"
            fill-rule="evenodd"
            d="M8.25 12a3.75 3.75 0 1 1 7.5 0a3.75 3.75 0 0 1-7.5 0m1.5 0a2.25 2.25 0 1 1 4.5 0a2.25 2.25 0 0 1-4.5 0"
            clip-rule="evenodd"
          /></svg
        >
      </button>
    {/if}
  {/if}
</div>

<style>
  .input-container {
    border-width: 1px;
    border-color: #666;
    border-radius: 5px;
    background: #202142;
    border-style: solid;
    padding: 20px 5px;
    display: flex;
    align-items: center;
    height: 40px;
  }
  .input {
    max-width: 400px;
    min-width: 300px;
    border: none;
    outline: none;
    background: #202142;
    color: white;
  }
  input:focus {
    outline: none; /* Removes the outline */
    box-shadow: none; /* Removes any shadow highlight */
    background: #202142;
  }
</style>
