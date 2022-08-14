<script>
  export let text = "";
  export let click = () => {};
  export let full = false;
  export let color = "white";
  export let className = "";
</script>

<button
  on:click={click}
  class={`${className || ""} ${full ? "full" : ""} ${color === "black" ? "black" : ""}`}
  >{text}</button
>

<style>
  button {
    border: 0;
    border-radius: 24px;
    display: block;
    padding: 0 20px;
    height: 48px;
    margin: 0;
    cursor: pointer;
    font-family: peyda;
    font-size: 16px;
    transition: 0.3s;
    background: #fff;
    box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(0, 0, 0, 0.1);
  }

  .full {
    width: 100%;
  }

  .black {
    color: #fff;
    background: #111;
  }
</style>
