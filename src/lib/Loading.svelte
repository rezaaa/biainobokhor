<script>
  import { BarLoader } from 'svelte-loading-spinners';
</script>

<div class="loading">
  <BarLoader size="60" color="#008ffd" unit="px" duration="1s" />
  <div>در حال دریافت سفارشات</div>
</div>

<style>
  .loading {
    margin: 80px auto 120px;
    padding: 40px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .loading div {
    margin-top: 20px;
  }
</style>