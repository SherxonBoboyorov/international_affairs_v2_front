export default async <T = any>(
  url: string,
  body?: null | Record<string, any>,
  query?: Record<string, string>,
  isMessage?: boolean
): Promise<ApiResponse<T>> => {
  const config = useRuntimeConfig();
  const authStore = useAuthStore();

  const fullUrl = query
    ? `${config.public.apiBase + url}?${new URLSearchParams(query)}`
    : `${config.public.apiBase + url}`;

  try {
    const { data } = await $fetch<{ data: T }>(fullUrl, {
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
  } catch (error: unknown) {
    if (
      error &&
      typeof error === "object" &&
      "response" in error &&
      error.response
    ) {
      myErorHandler(error.response as ErrorResponse, isMessage);
    }
    return {
      data: (error as any)?.data as T,
      status: false,
    };
  }
};
