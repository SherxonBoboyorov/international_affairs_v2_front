export const useVariebleStore = defineStore("variebleStore", () => {
  return {
    list: ref({
      admin: [
        {
          icon: "menu-home",
          id: 1,
          path: "/cabinet/admin/user",
          title: "Главная",
        },
        {
          icon: "menu-user",
          id: 1,
          path: "/cabinet/admin/department",
          title: "Пользователи",
        },
      ],
      user: [
        {
          icon: "users",
          id: 1,
          path: "/cabinet/confirmer/statements/list",
          title: "Заявления",
        },
        {
          icon: "users",
          id: 1,
          path: "/cabinet/confirmer/orders",
          title: "Приказы",
        },
      ],
    }),
    priority: ["default", "low", "medium", "high"],
    report_types: {
      daily_progress: "Ежедневный отчет по прогрессу",
      daily_report: "Сварочный отчет",
      electricity: "Ежедневный отчет Электрика",
      shift_report: "Ежедневный сменный рапорт",
      smr: "Ежедневный отчет СМР",
    },
    roles: {
      admin: "Технический администратор",
      user: "Пользователь",
    },
    unit_types: ["M", "M²", "M³", "ШТ", "ЧЕЛ", "Т", "ММ"],
  };
});
