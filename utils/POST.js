export default async (url, body, query, isMessage) => {
  const config = useRuntimeConfig();
  const authStore = useAuthStore();
  const fullUrl = query
    ? `${config.public.apiBase + url}?${new URLSearchParams(query)}`
    : `${config.public.apiBase + url}`;
  try {
    const { data } = await $fetch(fullUrl, {
      body,
      headers: {
        Authorization: authStore.access ? `Bearer ${authStore.access}` : "",
      },
      method: "POST",
    });
    return {
      data,
      status: true,
    };
  } catch (error) {
    myErorHandler(error && error.response, isMessage);
    return {
      data: error.data,
      status: false,
    };
  }
};
