<script>
  import Button from "./Button.svelte";
  import Logos from "./Logos.svelte";
  import { toast } from "@zerodevx/svelte-toast";
  import { viewState } from "./stores.js";
  import { getOrders, getProfile } from "./requests";
  import { getUserAgent } from "./utils";

  let token = "";
  let isMobile = getUserAgent().isMobile();

  const startAnalyse = async () => {
    localStorage.setItem("token", `Bearer ${token}`);
    if (localStorage.getItem("token")?.length > 0) {
      await getProfile();
      await getOrders();
    }
    if (!localStorage.getItem("token")) {
      viewState.update(() => 0);
      toast.push("خطا در دریافت اطلاعات، دوباره توکن را بررسی کنید", {
        theme: {
          "--toastBackground": "#F56565",
          "--toastBarBackground": "#C53030",
        },
      });
    }
  };
</script>

<div class="steps">
  <div class="privacy message">
    <p>
      توجه کنید که افراد سوء استفاده‌گر می‌توانند با روش‌ها و ترفندهای مختلف،
      مانند افزونه‌ی کروم، به دست آوردن توکن (کلید)، شبیه‌سازی فرم ورود با
      گرفتن شماره موبایل، کلمه عبور و یا ارسال کد ورود به صورت پیامک، به اطلاعات
      شما دست پیدا کنند. هنگام استفاده از هر سرویسی، از مورد اعتماد بودن آن
      اطمینان حاصل کنید.
    </p>
    <p> 
      این سرویس صرفا یک پروژه‌ی تجربی است که اطلاعات واقعی سازنده‌ی آن مشخص و قابل جستجو است، همچنین کدهای نوشته شده‌ی این سایت به صورت عمومی در دسترس قرار گرفته تا نحوه عملکرد آن مشخص باشد.
    </p>
  </div>
  <h1>«دریافت گزارش حساب کاربری اسنپ‌فود»</h1>
  {#if isMobile}
    <div class="step">
      <span class="step-number">اول</span>
      <p>ابتدا کد زیر را کپی کنید</p>
      <input
        type="text"
        value="javascript:(function()%7B(function()%20%7Bvar%20storage%20%3D%20localStorage.getItem('JWT')%3Bvar%20cookie%20%3D%20%60%3B%20%24%7Bdocument.cookie%7D%60.split(%60%3B%20jwt-access_token%3D%60)%3Bvar%20token%20%3D%20cookie.length%20%3D%3D%3D%202%20%3F%20cookie.pop().split('%3B').shift()%20%3A%20JSON.parse(storage%20%7C%7C%20%22%7B%7D%22).access_token%3Bnavigator.clipboard.writeText(token).then(()%3D%3E%7Balert(%22Token%20has%20been%20copied%20successfully%22)%3B%7D)%7D)()%7D)()"
        readonly
      />
    </div>
    <div class="step">
      <span class="step-number">دوم</span>
      <p>
        این صفحه را بوک‌مارک کنید و سپس آن را ویرایش و کد کپی شده را جایگزین
        لینک بوک‌مارک کنید
      </p>
    </div>
    <div class="step">
      <span class="step-number">سوم</span>
      <p>
        سایت <a href="https://snappfood.ir/" target="_blank" rel="nofollow"
          >اسنپ‌فود</a
        > را باز کنید و وارد حساب کاربری خود شوید
      </p>
    </div>
    <div class="step">
      <span class="step-number">سوم</span>
      <p>روی «بوک‌مارکی که ساختید» بزنید تا توکن کپی شود</p>
    </div>
  {:else}
    <div class="step">
      <span class="step-number">اول</span>
      <div>
        <p>آیکن بادمجان را بکشید و به نوار Bookmark اضافه کنید</p>
        <span
          >درصورت نبود نوار Bookmark، از منوی Bookmarks گزینه‌ی Show Bookmarks
          Bar را انتخاب کنید</span
        >
      </div>
      <a
        class="bookmark"
        title="Biainobokhor"
        href="javascript:(function()%7B(function()%20%7Bvar%20storage%20%3D%20localStorage.getItem('JWT')%3Bvar%20cookie%20%3D%20%60%3B%20%24%7Bdocument.cookie%7D%60.split(%60%3B%20jwt-access_token%3D%60)%3Bvar%20token%20%3D%20cookie.length%20%3D%3D%3D%202%20%3F%20cookie.pop().split('%3B').shift()%20%3A%20JSON.parse(storage%20%7C%7C%20%22%7B%7D%22).access_token%3Bnavigator.clipboard.writeText(token).then(()%3D%3E%7Balert(%22Token%20has%20been%20copied%20successfully%22)%3B%7D)%7D)()%7D)()"
        >🍆</a
      >
    </div>
    <div class="step">
      <span class="step-number">دوم</span>
      <p>
        سایت <a href="https://snappfood.ir/" target="_blank" rel="nofollow"
          >اسنپ‌فود</a
        > را باز کنید و وارد حساب کاربری خود شوید
      </p>
    </div>
    <div class="step">
      <span class="step-number">سوم</span>
      <p>روی «بوک‌مارک» کلیک کنید تا توکن کپی شود</p>
    </div>
  {/if}
  <div class="step">
    <span class="step-number">چهارم</span>
    <p>توکن کپی شده را در بخش زیر Paste کنید</p>
    <input type="text" bind:value={token} placeholder="Paste the token" />
  </div>
  <Button
    text="شروع بررسی"
    click={() => {
      startAnalyse();
      gtag && gtag("event", "bib-started");
    }}
    full
    color="black"
  />
  <div class="privacy">
    <h2>حریم شخصی و حفظ محرمانگی</h2>
    <p>
      این سرویس، هیچ‌یک از اطلاعات درخواستی از کاربر، مانند توکن و هیچ‌یک از
      اطلاعات دریافتی از سرویس اسنپ‌فود را ذخیره و نگه‌داری نمی‌کند و صرفا اقدام
      به نمایش اطلاعات می‌کند.
    </p>
    <p>
      کاربر می‌تواند در هر زمانی اقدام به قطع اتصال این سرویس با اسنپ‌فود نماید.
    </p>
    <p>
      روی این وب‌سایت از سرویس Google Analytics جهت شمارش تعداد کاربران و
      رویداد‌ها استفاده می‌شود.
    </p>
    <p>
      کد این سرویس منتشر شده و کارکرد آن مشخص است، لطفا در موارد مشابه، توکن
      (کلید دسترسی به اطلاعات) را بدون بررسی و اطمینان به هر سرویسی ارسال نکنید.
    </p>
    <p>
      سازنده‌ی این سرویس هیچ مسئولیتی در برابر سوء استفاده‌ی دیگران از سورس کد
      منتشر شده ندارد.
    </p>
  </div>
</div>
<Logos />

<style>
  .steps {
    max-width: 720px;
    width: 98%;
    line-height: 1.6;
    margin: 0 auto;
  }

  .steps h1 {
    text-align: center;
    margin: 0;
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 22px;
  }

  .step {
    padding: 16px;
    background-color: #fff;
    border-radius: 24px;
    margin-bottom: 12px;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.05);
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }

  .step:last-child {
    margin-bottom: 0;
  }

  .step > p,
  .step > div {
    flex: 1;
  }

  .step > div > span {
    font-size: 14px;
    color: #616870;
  }

  .step input {
    direction: ltr;
    width: 100%;
    margin-top: 20px;
    background-color: #f2f4f6;
    color: #19191b;
    border-radius: 24px;
    border: 1px solid transparent;
    height: 46px;
    outline: none;
    padding: 0 16px;
    transition: 0.3s;
  }

  .step input:focus {
    background-color: #fff;
    border: 1px solid #c1c4c9;
  }

  .step-number {
    background-color: #111;
    color: #fff;
    width: 50px;
    height: 50px;
    line-height: 1;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 16px;
    margin-left: 18px;
  }

  .bookmark {
    display: inline-block;
    font-size: 24px;
    height: 30px;
    width: 30px;
    background-color: rgb(239, 242, 245);
    border-radius: 16px;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.05);
    text-align: center;
    padding: 10px;
    margin-right: 10px;
  }

  .demoz {
    margin-top: 40px;
    padding-top: 16px;
    overflow: hidden;
    background-color: #fff;
    border-radius: 24px;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.05);
  }

  .message {
    margin-bottom: 40px;
  }

  .privacy {
    margin-top: 40px;
    padding: 16px;
    background-color: #fff;
    border-radius: 24px;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.05);
  }

  .privacy h2,
  .demoz h2 {
    text-align: center;
    margin: 0;
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 18px;
    line-height: 1.6;
  }

  .privacy p {
    margin-bottom: 15px;
  }

  .privacy p:last-child {
    margin-bottom: 0;
  }

  @media only screen and (max-device-width: 500px) {
    .steps h1 {
      font-size: 18px;
    }
  }
</style>
