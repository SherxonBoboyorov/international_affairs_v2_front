export default async (url, body, query) => {
  const config = useRuntimeConfig();
  const authStore = useAuthStore();

  try {
    const fullUrl = query
      ? `${config.public.apiBase}/${url}?${new URLSearchParams(query)}`
      : `${config.public.apiBase}/${url}`;
    const { data } = await $fetch(fullUrl, {
      headers: {
        Authorization: authStore.access ? `Bearer ${authStore.access}` : "",
      }.body,
      method: "PATCH",
    });

    return {
      data,
      status: true,
    };
  } catch (error) {
    myErorHandler(error.response);
    return {
      data: error.data,
      status: false,
    };
  }
};
