<script>
  import { farsiNumber } from "./utils";
  import logo from "../assets/images/logo.png";
  import dayjs from "dayjs";
  import jalaliday from "jalaliday";
  dayjs.extend(jalaliday);

  export let profile;
  export let reportDate;
  export let cost;
  export let preview = false;
  export let popularFoods;
  export let theme;
</script>

<div
  class={`wrapper ${preview ? "preview" : ""} ${theme}`}
  id={!preview ? "download2" : ""}
>
  <section>
    <div class="profile">
      <div class="user-info">
        <div class="name">
          گزارش <span class="highlighted">اسنپ‌فود</span> من
        </div>
        <div class="level">
          {[profile?.firstname, profile?.lastname].join(" ")}
        </div>
        <div class="level">{profile?.levelName}</div>
      </div>
    </div>
  </section>
  <section>
    <div class="card popup padded">
      <svg
        width="26"
        height="12"
        viewBox="0 0 26 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        ><mask
          id="mask0"
          mask-type="alpha"
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="26"
          height="10"
          ><rect
            width="26"
            height="10"
            fill={{
              dark: "#2B2C31",
              light: "#C4C4C4",
              beet: "#ca396b",
              yesterday: "#e48484",
              twilight: "#5f52a5",
              midnightgreen: "#0F3D3E"
            }[theme]}
          /></mask
        ><g mask="url(#mask0)"
          ><g filter="url(#filter0_d)"
            ><path
              d="M11.5858 3.41422C12.3668 2.63317 13.6332 2.63317 14.4142 3.41422L19.6569 8.65685C21.1571 10.1571 23.192 11 25.3137 11H26V12H0V11H0.686293C2.80802 11 4.84286 10.1571 6.34315 8.65685L11.5858 3.41422Z"
              fill={{
                dark: "#2B2C31",
                light: "#C4C4C4",
                beet: "#ca396b",
                yesterday: "#e48484",
                twilight: "#5f52a5",
                midnightgreen: "#0F3D3E"
              }[theme]}
            /></g
          ></g
        ><path
          d="M11.5858 3.41422C12.3668 2.63317 13.6332 2.63317 14.4142 3.41422L19.6569 8.65685C21.1571 10.1571 23.192 11 25.3137 11H26V12H0V11H0.686293C2.80802 11 4.84286 10.1571 6.34315 8.65685L11.5858 3.41422Z"
          fill={{
            dark: "#2B2C31",
            light: "#fff",
            beet: "#ca396b",
            yesterday: "#e48484",
            twilight: "#5f52a5",
            midnightgreen: "#0F3D3E"
          }[theme]}
        /><defs
          ><filter
            id="filter0_d"
            x="-5"
            y="-1.17157"
            width="36"
            height="19.1716"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
            ><feFlood
              flood-opacity="0"
              result="BackgroundImageFix"
            /><feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            /><feOffset dy="1" /><feGaussianBlur
              stdDeviation="2"
            /><feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"
            /><feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow"
            /><feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow"
              result="shape"
            /></filter
          ></defs
        ></svg
      >
      <div class="row flex">
        <div>
          {`گزارش از `}
          <span class="bold"
            >{farsiNumber(
              dayjs(reportDate?.firstOrder)
                .calendar("jalali")
                .locale("fa")
                .format("D MMMM YYYY")
            )}</span
          >
        </div>
        <div>{farsiNumber(cost.ordersCount)} سفارش</div>
      </div>
    </div>
  </section>
  <section>
    <div class="card padded centered">
      <div>
        <h3 class="title">محبوبترین</h3>
        {`${cost.popularVendor.type} `}
        <span class="bold">{cost.popularVendor.title}</span>
        {`با `}
        <span class="bold">{farsiNumber(cost.popularVendor.orders)}</span>
        {`سفارش `}
      </div>
    </div>
  </section>
  {#if popularFoods?.length > 0}
    <section>
      <div class="card padded centered">
        <h3 class="title large-margin">غذاهای محبوب</h3>
        <div class="grid grid-large-gap">
          {#each popularFoods as item}
            <div class="column-6 flex">
              <div title={item.description}>{item.name}</div>
              <div class="badge">
                {item.count.toLocaleString("FA-ir")}
              </div>
            </div>
          {/each}
        </div>
      </div>
    </section>
  {/if}
  <section class="centered">
    <img class="logo" src={logo} alt="" />
    <span>biainobokhor.ir</span>
  </section>
</div>

<style>
  .wrapper {
    width: 1080px;
    height: 1920px;
    background: #fbfbfb;
    padding: 140px 40px 70px;
    box-sizing: border-box;
  }

  .preview {
    transform-origin: 100% 0;
    transform: scale(0.3);
  }

  section {
    width: 98%;
    margin: 0 auto 30px;
    line-height: 1.6;
    font-size: 40px;
  }

  section:last-child {
    margin-bottom: 0;
  }

  .card {
    background-color: #fff;
    border-radius: 40px;
    border: 1px solid rgba(0, 0, 0, 10%);
    position: relative;
    box-sizing: border-box;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 24px;
    text-align: right;
  }

  .grid-large-gap {
    gap: 27px 50px;
  }

  .title.large-margin {
    margin-bottom: 39px;
  }

  .column-6 {
    grid-column: span 6;
  }

  .column-4 {
    grid-column: span 4;
  }

  .padded {
    padding: 40px;
  }

  .padded-sml {
    padding: 24px;
  }

  .popup {
    background: #fff;
  }

  .popup svg {
    position: absolute;
    pointer-events: none;
    top: -15px;
    right: 0;
    left: 0;
    margin: 0 auto;
    transform: scale(2);
  }

  .centered {
    text-align: center;
  }

  .row {
    display: flex;
    margin-bottom: 12px;
  }

  .bold {
    font-weight: bold;
  }

  .row:last-child {
    margin-bottom: 0;
  }

  .flex {
    display: flex;
    align-items: center;
  }

  .flex > *:first-child {
    flex: 1;
  }

  .title {
    flex: 1;
    color: #616870;
    margin: 0;
    margin-bottom: 6px;
    font-weight: normal;
  }

  .value {
    font-weight: bold;
    font-size: 50px;
  }

  .badge {
    padding: 12px 4px 5px;
    line-height: 1;
    text-align: center;
    width: 120px;
    border-radius: 20px;
    background: #efeff4;
  }

  .profile {
    display: flex;
    align-items: center;
    text-align: center;
  }

  .user-info {
    flex: 1;
  }

  .user-info .name {
    font-weight: bold;
    font-size: 50px;
  }

  .user-info .level {
    color: #616870;
    font-size: 40px;
  }

  .highlighted {
    color: #ff00a6;
  }

  .logo {
    width: 240px;
    margin: 78px auto 0;
    display: block;
  }

  /* dark */
  .wrapper.dark {
    background: #202124;
    color: #fff;
  }

  .dark .card {
    background-color: #2b2c31;
    border: 0;
  }

  .dark .title {
    color: #fff;
  }

  .dark .user-info .level {
    color: #fff;
  }

  .dark .badge {
    background: #202124;
  }

  /* beet */
  .wrapper.beet {
    background: #B93160;
    color: #fff;
  }

  .beet .highlighted {
    color: #111;
  }

  .beet .card {
    background-color: #ca396b;
    border: 0;
  }

  .beet .title {
    color: #fff;
  }

  .beet .user-info .level {
    color: #fff;
  }

  .beet .badge {
    background: #B93160;
  }

  /* yesterday */
  .wrapper.yesterday {
    background: #f29393;
    color: #fff;
  }

  .yesterday .highlighted {
    color: #111;
  }

  .yesterday .card {
    background-color: #e48484;
    border: 0;
  }

  .yesterday .title {
    color: #fff;
  }

  .yesterday .user-info .level {
    color: #fff;
  }

  .yesterday .badge {
    background: #f29393;
  }

  /* twilight */
  .wrapper.twilight {
    background: #554994;
    color: #fff;
  }

  .twilight .highlighted {
    color: #ffbe9d;
  }

  .twilight .card {
    background-color: #5f52a5;
    border: 0;
  }

  .twilight .title {
    color: #fff;
  }

  .twilight .user-info .level {
    color: #fff;
  }

  .twilight .badge {
    background: #554994;
  }

  /* midnightgreen */
  .wrapper.midnightgreen {
    background: #0F3D3E;
    color: #fff;
  }

  .midnightgreen .highlighted {
    color: #95e6e7;
  }

  .midnightgreen .card {
    background-color: #104344;
    border: 0;
  }

  .midnightgreen .title {
    color: #fff;
  }

  .midnightgreen .user-info .level {
    color: #fff;
  }

  .midnightgreen .badge {
    background: #0F3D3E;
  }
</style>
