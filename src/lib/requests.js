import {
  viewState,
  loadingState,
  ordersState,
  profileState,
} from "./stores";

export const getProfile = async () => {
  loadingState.update(() => true);
  return await fetch(
    "/user/load?optionalClient=WEBSITE&client=WEBSITE&deviceType=WEBSITE&appVersion=8.1.1&UDID=REZ&locale=fa",
    {
      method: "post",
      headers: {
        authorization: localStorage.getItem("token"),
      },
    }
  )
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        loadingState.update(() => false);
        viewState.update(() => 0);
      }
    })
    .catch((err) => {
      console.log({ err });
    })
    .then((res) => {
      const user = res?.data?.user;
      profileState.update(() => ({
        username: user?.username,
        firstname: user?.firstname,
        lastname: user?.lastname,
        levelName: user?.levelName,
        cellphone: user?.cellphone,
      }));
    });
};

export const getOrders = async ({ page = 14, size = 100 } = {}) => {
  loadingState.update(() => true);
  return await fetch(
    `/order/reorder?page=${page}&size=${size}`,
    {
      headers: {
        authorization: localStorage.getItem("token"),
      },
    }
  )
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        loadingState.update(() => false);
        viewState.update(() => 0);
      }
    })
    .catch((err) => {
      console.log({ err });
    })
    .then((res) => {
      const newPage = page + 1;
      const result = res?.data;
      const pages = Math.ceil(result?.count / result?.pageSize);
      ordersState.update((value) => {
        return {
          ...value,
          data: [...value?.data, ...result?.orders],
          currentPage: page,
        };
      });
      if (newPage <= pages) {
        getOrders({ page: newPage });
      } else {
        viewState.update(() => 1);
        loadingState.update(() => false);
      }
    });
};