<script>
  import Template1 from "./Template1.svelte";
  import Template2 from "./Template2.svelte";
  import html2canvas from "html2canvas";
  import Button from "./Button.svelte";
  import RadioButton from "./RadioButton.svelte";

  export let profile;
  export let reportDate;
  export let cost;
  export let modalOpen;
  export let handleModal;
  export let popularFoods;
  export let theme;
  export let handleTheme;

  function handleDownload(element, name) {
    html2canvas(document.querySelector(`#${element}`), {
      imageTimeout: 15000,
      scale: 3
    }).then((canvas) => {
      const a = document.createElement("a");
      a.href = canvas.toDataURL("image/jpg");
      a.download = name;
      a.click();
      gtag && gtag("event", `download-action-${name}`);
    });
  }
</script>

<div class={`modal ${modalOpen ? "open" : ""}`}>
  <span
    class="close"
    on:click={() => {
      handleModal(false);
      gtag && gtag("event", "download-close");
    }}>بازگشت</span
  >
  <h2>دانلود گزارش اسنپ‌فود</h2>
  <RadioButton
    value={theme}
    handleChange={(value) => handleTheme(value)}
    options={[
      { id: 0, name: "تیره", value: "dark" },
      { id: 1, name: "روشن", value: "light" },
      { id: 2, name: "چغندر", value: "beet" },
      { id: 3, name: "دیروز", value: "yesterday" },
      { id: 3, name: "گرگ و میش", value: "twilight" },
      { id: 3, name: "سبز نصف‌شب", value: "midnightgreen" },
    ]}
  />
  <div class="inner">
    <div class="column">
      <Button
        color="black"
        text="دانلود"
        className="download-button"
        click={() =>
          handleDownload("download1", "biainobokhor1.jpg")}
      />
      <div class="crop">
        <Template1 preview={true} {profile} {reportDate} {cost} {theme} />
      </div>
    </div>
    <div class="column">
      <Button
        color="black"
        text="دانلود"
        className="download-button"
        click={() =>
          handleDownload("download2", "biainobokhor2.jpg")}
      />
      <div class="crop">
        <Template2
          preview={true}
          {profile}
          {reportDate}
          {cost}
          {popularFoods}
          {theme}
        />
      </div>
    </div>
  </div>
</div>

<style>
  .modal {
    position: fixed;
    z-index: 9;
    background: #fff;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    overflow: auto;
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transition: 0.3s;
    box-sizing: border-box;
  }

  .close {
    top: 40px;
    right: 40px;
    position: absolute;
    border-radius: 24px;
    display: block;
    padding: 0 20px;
    height: 48px;
    cursor: pointer;
    font-size: 16px;
    transition: 0.3s;
    background: #fff;
    display: flex;
    align-items: center;
    box-shadow: 0 3px 8px 0 rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(0, 0, 0, 0.1);
  }

  h2 {
    text-align: center;
    padding-top: 40px;
    margin: 0 auto 40px;
  }

  .open {
    opacity: 1;
    visibility: visible;
    pointer-events: all;
  }

  .inner {
    max-width: 52%;
    width: 720px;
    padding: 20px 0 40px;
    margin: 0 auto;
    display: flex;
  }

  .inner > div {
    width: 50%;
  }

  .inner > div:last-child {
    margin-left: 0;
  }

  .crop {
    width: 324px;
    height: 576px;
    overflow: hidden;
    border-radius: 16px;
    margin-top: 20px;
    border: 1px solid rgba(0, 0, 0, 10%);
  }

  .column {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  :global(.download-button) {
    width: 324px;
  }

  @media only screen and (max-device-width: 500px) {
    .modal {
      padding: 0 20px;
    }

    h2 {
      padding-top: 120px;
    }

    .close {
      right: 50%;
      transform: translateX(50%);
    }

    .inner {
      flex-direction: column;
      max-width: none;
      width: 100%;
    }

    .column:first-child {
      margin-bottom: 40px;
    }

    .inner > div {
      width: 100%;
    }

    :global(.download-button) {
      width: 100%;
    }
  }
</style>
