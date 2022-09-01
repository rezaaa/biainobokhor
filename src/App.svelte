<script>
  import { viewState, loadingState } from "./lib/stores";
  import { SvelteToast } from "@zerodevx/svelte-toast";
  import Instructions from "./lib/Instructions.svelte";
  import { getOrders, getProfile } from "./lib/requests";
  import Report from "./lib/Report.svelte";
  import Header from "./lib/Header.svelte";
  import Footer from "./lib/Footer.svelte";
  import Loading from "./lib/Loading.svelte";

  let currentView = 0;
  let pageLoading = false;

  viewState.subscribe((value) => {
    currentView = value;
  });
  loadingState.subscribe((value) => {
    pageLoading = value;
  });

  const init = async () => {
    if (localStorage.getItem("token")?.length > 0) {
      await getProfile();
      await getOrders();
    }
  };
  init();
</script>

<main>
  <Header />
  <iframe class="github" src="https://ghbtns.com/github-btn.html?user=rezaaa&repo=biainobokhor&type=star&count=true" frameborder="0" scrolling="0" width="150" height="20" title="GitHub"></iframe>
  <div class="inner">
    {#if pageLoading}
      <Loading />
    {/if}
    {#if !pageLoading}
      {#if currentView === 0}
        <Instructions />
      {:else}
        <Report />
      {/if}
    {/if}
  </div>
  <Footer />
  <SvelteToast options={{ reversed: true, intro: { y: 80 } }} />
</main>

<style>
  .inner {
    padding: 0 80px;
    margin: 0 auto;
  }

  .github {
    position: absolute;
    left: 20px;
    top: 40px;
  }

  @media only screen and (max-device-width: 500px) {
    .inner {
      padding: 0 16px;
    }

  }
</style>
