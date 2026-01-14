export default async (url, query) => {
  const authStore = useAuthStore();
  const config = useRuntimeConfig();
  const fullUrl = query
    ? `${config.public.apiBase + url}?${new URLSearchParams(query)}`
    : `${config.public.apiBase + url}`;

  try {
    const { data } = await $fetch(fullUrl, {
      headers: {
        Authorization: authStore.access ? `Bearer ${authStore.access}` : "",
      },
      method: "DELETE",
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
