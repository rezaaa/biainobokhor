<script>
  import logo from "../assets/images/logo.png"
</script>

<div class="header">
  <img class="logo" src={logo} alt="" />
</div>

<style>
  .header {
    padding: 40px 80px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .logo {
    width: 150px;
  }

  @media only screen and (max-device-width: 500px) {
  .header {
    padding: 40px 16px;
  }
}
</style>