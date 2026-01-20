import { ElMessage } from "element-plus";

/**
 * Element Plus xabarlarini boshqarish uchun xizmat qiluvchi funksiya
 * @param text - Ko'rsatiladigan xabar matni
 * @param type - Xabar turi (success, warning, error, info)
 * @param duration - Davomiyligi (ms)
 * @param isHtml - HTML sifatida ko'rsatish
 */
export default (
  text: string,
  type: "error" | "info" | "success" | "warning" = "success",
  duration: number = 3000,
  isHtml: boolean = false
): void => {
  ElMessage({
    dangerouslyUseHTMLString: isHtml,
    duration: duration,
    message: text,
    showClose: true,
    type: type,
  });
};
