import dayjs from "dayjs";

/**
 * Dayjs kutubxonasini sozlash uchun plugin
 */
export default defineNuxtPlugin(() => {
  // Haftani dushanbadan boshlash (1 - dushanba)
  (dayjs as any).Ls.en.weekStart = 1;
});
