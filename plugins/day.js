import dayjs from "dayjs";

export default defineNuxtPlugin(() => {
  dayjs.Ls.en.weekStart = 1;
});
