<script>
  import { BarLoader } from 'svelte-loading-spinners';
  import { ordersState } from "./stores";
  import { farsiNumber } from "./utils";

  let orders;

  ordersState.subscribe((value) => {
    orders = value;
  });
</script>

<div class="loading">
  <BarLoader size="60" color="#008ffd" unit="px" duration="1s" />
  <div>در حال دریافت سفارشات</div>
  <p>درصورت بالا بودن تعداد سفارشات، ممکن است این فرآیند کمی طول بکشد</p>
  <p>{`صفحه ${farsiNumber(orders?.currentPage + 1)} از ${farsiNumber(orders?.pages)}`}</p>
</div>

<style>
  .loading {
    margin: 80px auto 120px;
    padding: 40px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  .loading div {
    margin-top: 20px;
  }

  .loading p {
    color: #616870;
    line-height: 1.5;
    margin-top: 12px;
  }
</style>