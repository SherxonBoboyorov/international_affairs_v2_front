export default async (url, query) => {
  const config = useRuntimeConfig();
  const authStore = useAuthStore();

  // Convert null and undefined values to empty strings
  const filteredQuery = query
    ? Object.fromEntries(
        Object.entries(query).filter(([value]) => {
          return (
            value !== null &&
            value !== undefined &&
            value !== "" &&
            (typeof value !== "string" || value.trim() !== "")
          );
        })
      )
    : {};

  const fullUrl =
    Object.keys(filteredQuery).length > 0
      ? `${config.public.apiBase + url}?${new URLSearchParams(filteredQuery)}`
      : `${config.public.apiBase + url}`;

  try {
    const { data } = await $fetch(fullUrl, {
      headers: {
        Authorization: authStore.access ? `Bearer ${authStore.access}` : "",
      },
      method: "GET",
      query: filteredQuery,
    });
    return {
      data,
      status: true,
    };
  } catch (error) {
    myErorHandler(error.response);
    throw error;
  }
};
