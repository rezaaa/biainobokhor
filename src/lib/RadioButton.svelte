<script>
  export let value = 0;
  export let options;
  export let handleChange;
</script>

<div class="radio">
  {#each options as item}
    <div
      class={`option ${value === item.value ? "selected" : ""}`}
      on:click={() => handleChange(item.value)}
    >
      {item.name}
    </div>
  {/each}
</div>

<style>
  .radio {
    display: flex;
    flex-wrap: wrap;
    border-radius: 24px;
    min-height: 48px;
    font-family: peyda;
    font-size: 16px;
    width: 692px;
    margin: 0 auto;
    transition: 0.3s;
    background: #fff;
    align-items: center;
    padding: 0 3px;
    box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
  }

  .option {
    flex: 1;
    text-align: center;
    transition: .3s;
    cursor: pointer;
    padding: 10px 0;
    border-radius: 24px;
  }

  .selected {
    cursor: default;
    background: #000;
    color: #fff;
  }

  @media only screen and (max-device-width: 500px) {
    .radio {
      width: 100%;
      padding: 3px;
    }
    
    .option {
      flex: 0 0 33.333333%;
    }
  }
</style>
