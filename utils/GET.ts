/**
 * GET so'rovi uchun xizmat qiluvchi funksiya
 * @param url - API manzili
 * @param query - So'rov parametrlari
 */
export default async <T = unknown>(
  url: string,
  query?: Record<string, unknown>
): Promise<ApiResponse<T>> => {
  const config = useRuntimeConfig();
  const authStore = useAuthStore();

  // Null, undefined bo'sh qiymatlarni filtrlab olish
  const filteredQuery = query
    ? Object.fromEntries(
        Object.entries(query).filter(([_, value]) => {
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
      ? `${config.public.apiBase + url}?${new URLSearchParams(filteredQuery as Record<string, string>)}`
      : `${config.public.apiBase + url}`;

  try {
    const data = await $fetch<T>(fullUrl, {
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
  } catch (error: unknown) {
    if (
      error &&
      typeof error === "object" &&
      "response" in error &&
      error.response
    ) {
      myErorHandler(error.response as ErrorResponse);
    }
    throw error;
  }
};
