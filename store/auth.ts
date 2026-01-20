export const useAuthStore = defineStore(
  "auth",
  () => {
    const router = useRouter();
    const access = ref<string>("");
    const role = ref<string>("");
    const user = ref<string>("");
    const loading = ref<boolean>(false);

    const login = async (
      form: LoginPayload
    ): Promise<{ role: string | undefined; status: boolean }> => {
      loading.value = true;
      const { data, status } = await POST<LoginResponse>(
        "login",
        form,
        undefined,
        true
      );

      if (status && data) {
        const _surname = data.user.surname || "";
        const _name = data.user.given_name || "";
        const _patronymic = data.user.patronymic || "";

        user.value = JSON.stringify({
          email: data.user.email,
          name: `${_surname} ${_name} ${_patronymic}`.trim(),
          phone: data.user.phone,
          role: data.roles[0],
        } as AuthUser);

        access.value = data.token;
        role.value = data.roles[0];
      }

      loading.value = false;
      return {
        role: status && data ? data.roles[0] : undefined,
        status,
      };
    };

    const register = async (
      form: FormData | RegisterPayload
    ): Promise<{ status: boolean }> => {
      loading.value = true;
      const { status } = await POST<RegisterResponse>("register", form);
      loading.value = false;
      return {
        status,
      };
    };

    const forgotPassword = async (
      form: ForgotPasswordPayload
    ): Promise<{ status: boolean }> => {
      loading.value = true;
      const { status } = await POST<ForgotPasswordResponse>(
        "forgot-password",
        form
      );
      loading.value = false;
      return {
        status,
      };
    };

    const verifyResetCode = async (
      form: VerifyResetCodePayload
    ): Promise<{ status: boolean }> => {
      loading.value = true;
      const { status } = await POST<VerifyResetCodeResponse>(
        "verify-reset-code",
        form
      );
      loading.value = false;
      return {
        status,
      };
    };

    const resetPassword = async (
      form: ResetPasswordPayload
    ): Promise<{ role: string | undefined; status: boolean }> => {
      loading.value = true;
      const { status } = await POST<ResetPasswordResponse>(
        "reset-password",
        form
      );
      loading.value = false;
      return {
        role: "",
        status,
      };
    };

    const logOut = async (): Promise<void> => {
      access.value = "";
      role.value = "";
      user.value = "";
      router.push("/auth");
    };

    return {
      access,
      forgotPassword,
      loading,
      login,
      logOut,
      register,
      resetPassword,
      role,
      user,
      verifyResetCode,
    };
  },
  {
    persist: true,
  }
);
