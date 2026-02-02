// /utils/GET.ts
/**
 * GET so'rovi uchun xizmat qiluvchi funksiya
 * @param url - API manzili
 * @param query - So'rov parametrlari
 */
export default async function GET<T = unknown>(
  url: string,
  query?: QueryParams
): Promise<ApiResponse<T>> {
  const config = useRuntimeConfig();
  const authStore = useAuthStore();

  // Null, undefined bo'sh qiymatlarni filtrlab olish
  const filteredQuery: Record<string, unknown> = query
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

  // URLSearchParams uchun value'larni stringga convert qilish
  const stringQuery: Record<string, string> = Object.fromEntries(
    Object.entries(filteredQuery).map(([key, value]) => {
      return [key, String(value)];
    })
  );

  const hasQuery = Object.keys(stringQuery).length > 0;

  const fullUrl = hasQuery
    ? `${config.public.apiBase + url}?${new URLSearchParams(stringQuery)}`
    : `${config.public.apiBase + url}`;

  try {
    const response = await $fetch<T>(fullUrl, {
      headers: {
        Authorization: authStore.access ? `Bearer ${authStore.access}` : "",
      },
      method: "GET",
      // bu yerda ham stringQuery ishlatsang ham bo‘ladi, yoki filteredQuery ham ok
      query: filteredQuery,
    });

    const responseData = response as any;

    return {
      data: responseData.data || responseData || null,
      status: true,
    };
  } catch (error: unknown) {
    if (
      error &&
      typeof error === "object" &&
      "response" in error &&
      (error as { response?: unknown }).response
    ) {
      myErorHandler((error as { response: ErrorResponse }).response);
    }
    throw error;
  }
}
