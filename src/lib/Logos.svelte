<script>
  import sazito from '../assets/images/sazito.png';
  import demoz from '../assets/images/demoz.png';
  import instagram from '../assets/images/instagram.png';
</script>

<div class="wrapper">
  <a href="https://sazito.com" target="_blank">
    <img src={sazito} alt="فروشگاه ساز سازیتو" />
  </a>
  <a href="https://instagram.ir" target="_blank">
    <img src={instagram} alt="generate movie stories" />
  </a>
</div>

<style>
  .wrapper {
    width: 720px;
    margin: 80px auto 0;
    display: flex;
    align-items: center;
  }
  
  .wrapper a {
    flex: 1;
  }

  .wrapper img {
    width: 50%;
    display: block;
    margin: 0 auto;
    filter: grayscale(100);
    transform: .3s;
  }

  .wrapper img:hover {
    filter: grayscale(0);
  }

  @media only screen and (max-device-width: 500px) {
    .wrapper {
      width: 100%;
    }

    .wrapper a {
      margin: 10px 0;
    }

    .wrapper img {
      width: 80%;
    }
  }
</style>