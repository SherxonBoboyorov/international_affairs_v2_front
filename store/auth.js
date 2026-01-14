export const useAuthStore = defineStore(
  "auth",
  () => {
    const router = useRouter();
    const access = ref("");
    const role = ref("");
    const user = ref("");
    const loading = ref();
    const signIn = async (form) => {
      const { data, status } = await POST("auth/login", form);
      if (status) {
        let _surname = data.user.surname || "";
        let _name = data.user.given_name || "";
        let _patronymic = data.user.patronymic || "";
        user.value = JSON.stringify({
          email: data.user.email,
          name: _surname + " " + _name + " " + _patronymic,
          phone: data.user.phone,
          role: data.role[0],
        });
        access.value = data.token;
        role.value = data.role[0];
      }
      loading.value = false;
      return { role: data.role && data.role[0], status };
    };
    const logOut = async () => {
      // const { data, status } = await POST('auth/logout')
      access.value = "";
      role.value = "";
      user.value = "";
      router.push("/auth");
    };
    return {
      access,
      loading,
      logOut,
      role,
      signIn,
      user,
    };
  },
  {
    persist: true,
  }
);
