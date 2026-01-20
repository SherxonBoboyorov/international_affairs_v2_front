/**
 * Kuki (cookies) bilan bog'liq holatlarni boshqarish uchun store
 */
export const useCookiesStore = defineStore(
  "cookiesStore",
  () => {
    // Menyu ochiq yoki yopiqligi holati
    const isOpenMenu = ref<boolean>(false);

    return {
      isOpenMenu,
    };
  },
  {
    persist: true,
  }
);
