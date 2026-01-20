/**
 * Global avtorizatsiya middleware'i
 * Cabinet yo'llariga kirishni tekshiradi
 */
export default defineNuxtRouteMiddleware((to) => {
  const store = useAuthStore();
  const role = store.role;
  const access = store.access;
  const languagePrefixes = ["/ru", "/uz", "/en"];
  let fullPath = to.fullPath;

  // Til prefikslarini olib tashlash
  for (const prefix of languagePrefixes) {
    if (to.fullPath.startsWith(prefix)) {
      fullPath = fullPath.replace(prefix, "");
      break;
    }
  }

  // Agar cabinet yo'li bo'lmasa, tekshirish kerakmas
  if (!fullPath.startsWith("/cabinet")) {
    return;
  }

  // Rolga qarab kirishni tekshirish
  const pathSegments = fullPath.split("/").filter((segment) => segment !== "");
  if (pathSegments.length >= 2) {
    const targetRole = pathSegments[1];

    if (role !== targetRole) {
      return navigateTo("/auth");
    }
  }

  // Token bormi yo'qmi tekshirish
  if (!access) {
    return navigateTo("/auth");
  }
});
