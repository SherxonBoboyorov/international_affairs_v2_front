export const useCookiesStore = defineStore(
  "cookiesStore",
  () => {
    const isOpenMenu = ref(false);
    return {
      isOpenMenu,
    };
  },
  {
    persist: true,
  }
);
