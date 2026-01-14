export default async (url, body, isMessage) => {
  const config = useRuntimeConfig();
  const authStore = useAuthStore();

  try {
    const { data } = await $fetch(config.public.apiBase + url, {
      body,
      headers: {
        Authorization: authStore.access ? `Bearer ${authStore.access}` : "",
      },
      method: "PUT",
    });
    return {
      data,
      status: true,
    };
  } catch (error) {
    myErorHandler(error.response, isMessage);
    return {
      data: error.data,
      status: false,
    };
  }
};
