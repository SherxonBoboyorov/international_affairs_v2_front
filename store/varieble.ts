export const useVariebleStore = defineStore("variebleStore", () => {
  const list = ref<VariebleMenuList>({
    editor: [
      {
        icon: "menu-home",
        id: 1,
        path: "/cabinet/editor/article",
        title: "Главная",
      },
      {
        icon: "menu-user",
        id: 1,
        path: "/cabinet/editor/user",
        title: "Пользователи",
      },
      {
        icon: "menu-submenu",
        id: 1,
        path: "/cabinet/editor/user/new",
        title: "Новые",
      },
      {
        icon: "menu-submenu",
        id: 1,
        path: "/cabinet/editor/user/active",
        title: "Активные",
      },
      {
        icon: "menu-submenu",
        id: 1,
        path: "/cabinet/editor/user/archive",
        title: "Архив",
      },
    ],
    reviewer: [
      {
        icon: "menu-new",
        id: 1,
        path: "/cabinet/reviewer/new",
        title: "Новые",
      },
      {
        icon: "menu-in-work",
        id: 2,
        path: "/cabinet/reviewer/in-work",
        title: "В работе",
      },
      {
        icon: "menu-finished",
        id: 3,
        path: "/cabinet/reviewer/finished",
        title: "Завершенные",
      },
      {
        icon: "menu-profile",
        id: 4,
        path: "/cabinet/reviewer/profile",
        title: "Профиль",
      },
    ],
  });

  // Prioritetlar ro'yxati
  const priority = ref<string[]>(["default", "low", "medium", "high"]);

  // Rollar ro'yxati
  const roles = ref<Record<string, string>>({
    editor: "Редактор",
    reviewer: "Рецензент",
  });

  // O'lchov birliklari
  const unit_types = ref<string[]>(["M", "M²", "M³", "ШТ", "ЧЕЛ", "Т", "ММ"]);

  return {
    list,
    priority,
    roles,
    unit_types,
  };
});
