import { vMaska } from "maska/vue";

/**
 * Maska (input mask) pluginini ro'yxatdan o'tkazish
 */
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("maska", vMaska);
});
