<script>
  import Button from "./Button.svelte";
  import Logos from "./Logos.svelte";
  import { ordersState, profileState, viewState } from "./stores";
  import dayjs from "dayjs";
  import jalaliday from "jalaliday";
  import { farsiNumber, convertToSeperatedFarsiPrice } from "./utils";
  import Modal from "./Modal.svelte";
  import Template1 from "./Template1.svelte";
  import Template2 from "./Template2.svelte";
  dayjs.extend(jalaliday);

  let modalOpen = false;
  let orders;
  let profile;
  let theme = "light";

  ordersState.subscribe((value) => {
    orders = value;
  });
  profileState.subscribe((value) => {
    profile = value;
  });

  const handleModal = (open) => {
    modalOpen = open;
  };

  const handleTheme = (value) => {
    theme = value;
  };

  const ordersCost = () => {
    const totalPrice = orders?.data?.map((item) => item.totalPrice);
    const totalDiscount = orders?.data?.map((item) => item.sumAllDiscount);
    const firstOrder = orders?.data[orders?.data?.length - 1];

    let result = {};
    result.averageBasket = Math.round(
      totalPrice.reduce((avg, value, _, { length }) => {
        return avg + value / length;
      }, 0)
    );
    result.totalPurchase = totalPrice.reduce(
      (partialSum, a) => partialSum + a,
      0
    );
    result.mostExpensive = Math.max(...totalPrice);
    result.ordersCount = totalPrice?.length;
    result.totalDiscount = totalDiscount.reduce(
      (partialSum, a) => partialSum + a,
      0
    );
    result.popularVendor = popularVendor();
    result.firstOrder = {
      date: firstOrder?.startedAt,
      title: firstOrder?.vendorTitle,
      total: firstOrder?.totalPrice,
    };
    return result;
  };

  const popularVendor = () => {
    let counts = {};
    orders?.data?.forEach((item) => {
      counts[item.vendorTitle] = {
        count: (counts[item.vendorTitle]?.count || 0) + 1,
        logo: item.vendorLogo,
        type: item.newTypeTitle,
      };
    });
    let sortable = [];
    for (var vendor in counts) {
      sortable.push([vendor, counts[vendor]]);
    }

    sortable.sort((a, b) => {
      return b[1].count - a[1].count;
    });
    return sortable?.length > 0
      ? {
          title: sortable[0][0],
          orders: sortable[0][1]?.count,
          logo: sortable[0][1]?.logo,
          type: sortable[0][1]?.type,
        }
      : { title: "نامشخص", orders: "نامشخص" };
  };

  const dateRange = () => {
    const firstOrder = orders?.data[orders?.data?.length - 1]?.startedAt;
    const lastOrder = orders?.data[0].startedAt;
    return { firstOrder, lastOrder };
  };

  const extractTitles = () => {
    return orders?.data?.map((item) => {
      return item.products.map((p) => p.productTitle || p.title).join();
    });
  };

  const search = (terms) => {
    return extractTitles()?.filter((item) => {
      if (new RegExp(terms.join("|")).test(item)) {
        return item;
      }
    })?.length;
  };

  const findPopularFoods = () => {
    let foods = [
      {
        name: "کوبیده",
        count: search(["لقمه", "کوبیده"]),
        description: "کوبیده، لقمه",
      },
      {
        name: "کباب برگ",
        count: search(["کباب برگ"]),
        description: "کباب برگ",
      },
      {
        name: "چنجه",
        count: search(["چنجه"]),
        description: "چنجه",
      },
      {
        name: "سلطانی",
        count: search(["سلطانی"]),
        description: "سلطانی",
      },
      {
        name: "بختیاری",
        count: search(["بختیاری"]),
        description: "بختیاری",
      },
      {
        name: "کباب تابه‌ای",
        count: search(["تابه‌ای", "تابه ای"]),
        description: "کباب تابه‌ای",
      },
      {
        name: "ماهی",
        count: search(["ماهی"]),
        description: "ماهی",
      },
      {
        name: "دلمه",
        count: search(["دلمه"]),
        description: "دلمه",
      },
      {
        name: "عدس پلو",
        count: search(["عدس پلو"]),
        description: "عدس پلو",
      },
      {
        name: "ته‌چین",
        count: search(["ته‌چین", "ته چین"]),
        description: "ته‌چین",
      },
      {
        name: "کتلت",
        count: search(["کتلت", "شامی"]),
        description: "کتلت، شامی",
      },
      {
        name: "کوکو",
        count: search(["کوکو"]),
        description: "کوکو",
      },
      {
        name: "باقالی پلو",
        count: search(["باقالی پلو"]),
        description: "باقالی پلو",
      },
      {
        name: "میرزاقاسمی",
        count: search(["میرزاقاسمی", "میرزا قاسمی"]),
        description: "میرزاقاسمی",
      },
      {
        name: "کشک بادمجان",
        count: search(["کشک بادمجان"]),
        description: "کشک بادمجان",
      },
      {
        name: "بندری",
        count: search(["بندری"]),
        description: "بندری",
      },
      {
        name: "باقالاقاتوق",
        count: search(["باقالاقاتوق", "باقالا قاتوق"]),
        description: "باقالاقاتوق",
      },
      {
        name: "جوجه",
        count: search(["جوجه"]),
        description: "جوجه",
      },
      {
        name: "پیتزا",
        count: search(["پیتزا"]),
        description: "پیتزا",
      },
      {
        name: "ماکارونی، پاستا",
        count: search(["پاستا", "ماکارونی", "اسپاگتی"]),
        description: "ماکارونی، اسپاگتی، پاستا",
      },
      {
        name: "ساندویچ",
        count: search(["ساندویچ"]),
        description: "ساندویچ",
      },
      {
        name: "دونر",
        count: search(["دونر"]),
        description: "دونر، کباب ترکی",
      },
      {
        name: "لوبیا پلو، استانبولی",
        count: search(["لوبیا پلو", "استانبولی"]),
        description: "لوبیا پلو، استانبولی",
      },
      {
        name: "سیب زمینی",
        count: search(["سیب زمینی", "فرایز"]),
        description: "سیب زمینی، فرایز",
      },
      {
        name: "سالاد",
        count: search(["سالاد"]),
        description: "سالاد",
      },
      {
        name: "سوخاری",
        count: search(["سوخاری"]),
        description: "سوخاری",
      },
      {
        name: "همبرگر",
        count: search(["همبرگر", "برگر"]),
        description: "همبرگر، برگر",
      },
      {
        name: "قورمه‌سبزی",
        count: search(["قورمه"]),
        description: "قرمه‌سبزی",
      },
      {
        name: "قیمه",
        count: search(["قیمه"]),
        description: "قیمه",
      },
      {
        name: "فسنجان",
        count: search(["فسنجان"]),
        description: "فسنجان",
      },
      {
        name: "زرشک پلو",
        count: search(["زرشک پلو"]),
        description: "زرشک پلو",
      },
      {
        name: "سوشی",
        count: search(["سوشی"]),
        description: "سوشی",
      },
      {
        name: "نودل",
        count: search(["نودل"]),
        description: "نودل",
      },
      {
        name: "سوپ",
        count: search(["سوپ"]),
        description: "سوپ",
      },
      {
        name: "آش",
        count: search(["آش"]),
        description: "آش",
      },
      {
        name: "آبگوشت",
        count: search(["آبگوشت", "دیزی"]),
        description: "آبگوشت، دیزی",
      },
    ];

    return foods
      .sort((a, b) => {
        return b.count - a.count;
      })
      .filter((item) => item.count > 0);
  };

  const cost = ordersCost();
  const reportDate = dateRange();
  const popularFoods = findPopularFoods();
  const popularFoodsSpliced = findPopularFoods()?.splice(0, 14);
  const emojies = [
    "🍩",
    "🍡",
    "🍣",
    "🍢",
    "🍝",
    "🍜",
    "🍚",
    "🍳",
    "🧆",
    "🥙",
    "🌯",
    "🌮",
    "🥪",
    "🌭",
    "🍕",
    "🍟",
    "🍔",
    "🥩",
    "🍗",
    "🍖",
    "🥐",
    "🥖",
    "🍑",
  ];
</script>

<section>
  <div class="profile">
    <div class="avatar">
      {emojies[Math.floor(Math.random() * emojies.length)]}
    </div>
    <div class="user-info">
      <div class="name">
        {[profile?.firstname, profile?.lastname].join(" ")}
      </div>
      <div class="level">{profile?.levelName}</div>
    </div>
    <Button
      className="modal-button"
      text="دانلود و اشتراک‌گذاری"
      color="black"
      click={() => {
        handleModal(true);
        gtag && gtag('event', 'download-open');
      }}
    />
    <Button
      className="logout-button"
      text="خروج"
      click={() => {
        localStorage.removeItem("token");
        viewState.update(() => 0);
        ordersState.update(() => ({}));
        gtag && gtag('event', 'bib-logout');
      }}
    />
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
        height="10"><rect width="26" height="10" fill="#C4C4C4" /></mask
      ><g mask="url(#mask0)"
        ><g filter="url(#filter0_d)"
          ><path
            d="M11.5858 3.41422C12.3668 2.63317 13.6332 2.63317 14.4142 3.41422L19.6569 8.65685C21.1571 10.1571 23.192 11 25.3137 11H26V12H0V11H0.686293C2.80802 11 4.84286 10.1571 6.34315 8.65685L11.5858 3.41422Z"
            fill="#C4C4C4"
          /><path
            d="M26.5 11V10.5H26H25.3137C23.3246 10.5 21.4169 9.70982 20.0104 8.3033L14.7678 3.06066C13.7915 2.08435 12.2085 2.08435 11.2322 3.06066L5.98959 8.3033C4.58307 9.70982 2.67542 10.5 0.686293 10.5H0H-0.5V11V12V12.5H0H26H26.5V12V11Z"
            stroke="black"
            stroke-opacity="0.05"
          /></g
        ></g
      ><path
        d="M11.5858 3.41422C12.3668 2.63317 13.6332 2.63317 14.4142 3.41422L19.6569 8.65685C21.1571 10.1571 23.192 11 25.3137 11H26V12H0V11H0.686293C2.80802 11 4.84286 10.1571 6.34315 8.65685L11.5858 3.41422Z"
        fill="#fff"
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
          /><feOffset dy="1" /><feGaussianBlur stdDeviation="2" /><feColorMatrix
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
        <em
          >{farsiNumber(
            dayjs(reportDate?.firstOrder)
              .calendar("jalali")
              .locale("fa")
              .format("D MMMM YYYY")
          )}</em
        >
        {` تا `}
        <em
          >{farsiNumber(
            dayjs(reportDate?.lastOrder)
              .calendar("jalali")
              .locale("fa")
              .format("D MMMM YYYY")
          )}</em
        >
      </div>
      <div>{farsiNumber(cost.ordersCount)} سفارش</div>
    </div>
  </div>
</section>
<section>
  <div class="grid">
    <div class="column-6 column-12-small centered card">
      <div class="padded">
        <h3 class="title">مبلغ کل خرید</h3>
        <span class="value green"
          >{convertToSeperatedFarsiPrice(Math.round(cost.totalPurchase))} تومان</span
        >
      </div>
      <span class="separator" />
      <div class="padded-sml">
        <span
          >{convertToSeperatedFarsiPrice(Math.round(cost.totalDiscount))} تومان تخفیف</span
        >
      </div>
    </div>
    <div class="column-6 column-12-small centered card">
      <div class="padded">
        <h3 class="title">مبلغ گران‌ترین سفارش</h3>
        <span class="value"
          >{convertToSeperatedFarsiPrice(Math.round(cost.mostExpensive))} تومان</span
        >
      </div>
      <span class="separator" />
      <div class="padded-sml">
        <span
          >میانگین هر خرید {convertToSeperatedFarsiPrice(
            Math.round(cost.averageBasket)
          )} تومان</span
        >
      </div>
    </div>
  </div>
</section>
<section>
  <div class="card">
    <span class="love">❤️</span>
    <div class="row flex padded">
      <div>
        <h3 class="title">محبوبترین</h3>
        {`${cost.popularVendor.type} `}
        <em>{cost.popularVendor.title}</em>
        {`با `}
        <em>{farsiNumber(cost.popularVendor.orders)}</em>
        {`سفارش `}
      </div>
      <div class="vendor-logo-wrapper">
        <img class="vendor-logo" src={cost.popularVendor.logo} alt="" />
      </div>
    </div>
  </div>
</section>
<section>
  <div class="card padded">
    <h3 class="title">اولین سفارش ثبت شده</h3>
    <div class="row flex">
      <div>
        {`در تاریخ `}
        <em
          >{farsiNumber(
            dayjs(cost.firstOrder.date)
              .calendar("jalali")
              .locale("fa")
              .format("D MMMM YYYY")
          )}</em
        >
        {`از `}
        <em>{cost.firstOrder.title}</em>
      </div>
      <div>{convertToSeperatedFarsiPrice(cost.firstOrder.total)} تومان</div>
    </div>
  </div>
</section>
<section>
  <div class="card padded">
    <h3 class="title large-margin">غذاهای محبوب (تقریبی)</h3>
    <div class="grid grid-large-gap">
      {#each popularFoods as item}
        <div class="column-4 column-6-small flex">
          <div title={item.description}>{item.name}</div>
          <div class="badge">
            {item.count.toLocaleString("FA-ir")}
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>
<Logos />

<Modal
  {modalOpen}
  {handleModal}
  {profile}
  {reportDate}
  {cost}
  popularFoods={popularFoodsSpliced}
  {handleTheme}
  {theme}
/>
{#if modalOpen}
  <Template1 {profile} {reportDate} {cost} {theme} />
  <Template2
    {profile}
    {reportDate}
    {cost}
    popularFoods={popularFoodsSpliced}
    {theme}
  />
{/if}

<style>
  section {
    max-width: 720px;
    width: 98%;
    margin: 0 auto 24px;
    line-height: 1.6;
  }

  section:last-child {
    margin-bottom: 0;
  }

  .card {
    background-color: #fff;
    border-radius: 24px;
    border: 1px solid rgba(0, 0, 0, 10%);
    position: relative;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 24px;
  }

  .grid-large-gap {
    gap: 24px 40px;
  }

  .column-6 {
    grid-column: span 6;
  }

  .column-4 {
    grid-column: span 4;
  }

  .padded {
    padding: 24px;
  }

  .padded-sml {
    padding: 14px 24px;
  }

  .popup {
    background: #fff;
    border: 0;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.05);
  }

  .popup svg {
    position: absolute;
    pointer-events: none;
    top: -11px;
    right: 92px;
  }

  .centered {
    text-align: center;
  }

  .row {
    display: flex;
    margin-bottom: 12px;
  }

  .row em {
    font-weight: bold;
    margin: 0 4px;
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
    font-size: 16px;
  }

  .title.large-margin {
    margin-bottom: 16px;
  }

  .value {
    font-weight: bold;
  }

  .separator {
    height: 1px;
    width: 100%;
    display: block;
    background: rgba(0, 0, 0, 10%);
  }

  .green {
    color: #32bd64;
  }

  .vendor-logo-wrapper {
    position: relative;
    width: 70px;
    height: 70px;
  }

  .vendor-logo {
    width: 100%;
    height: 100%;
    border-radius: 24px;
    object-fit: cover;
  }

  .love {
    background: #fff;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.05);
    border-radius: 20px;
    position: absolute;
    right: 0;
    left: 0;
    margin: 0 auto;
    width: 40px;
    text-align: center;
    top: -12px;
    padding: 7px 0 4px;
    line-height: 1;
    font-family: "bib-emojies";
  }

  .badge {
    padding: 6px 4px 5px;
    line-height: 1;
    text-align: center;
    width: 36px;
    border-radius: 20px;
    background: #efeff4;
  }

  .profile {
    display: flex;
    align-items: center;
  }

  .avatar {
    width: 68px;
    height: 68px;
    border-radius: 50%;
    background: #efeff4;
    margin-left: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 40px;
    font-family: "bib-emojies";
  }

  .user-info {
    flex: 1;
  }

  .user-info .name {
    font-weight: bold;
  }

  .user-info .level {
    color: #616870;
    font-size: 14px;
  }

  :global(button.logout-button) {
    margin-right: 14px;
  }

  @media only screen and (max-device-width: 500px) {
    .profile {
      display: block;
      text-align: center;
    }

    .avatar {
      margin: 20px auto;
    }

    .flex {
      flex-direction: column;
    }

    .user-info {
      margin-bottom: 20px;
    }

    :global(button.logout-button) {
      width: 100%;
      margin-right: 0;
    }

    :global(button.modal-button) {
      width: 100%;
      margin-bottom: 10px;
    }

    .grid-large-gap {
      gap: 24px;
    }

    .column-6.column-12-small {
      grid-column: span 12;
    }

    .column-4.column-6-small {
      grid-column: span 6;
    }

    .title {
      text-align: center;
    }

    .vendor-logo-wrapper {
      margin-top: 20px;
    }

    .badge {
      margin-top: 6px;
    }

    .popup svg {
      right: 0;
      left: 0;
      margin: 0 auto;
    }
  }
</style>
