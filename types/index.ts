/**
 * API javoblari uchun umumiy interfeys
 * @template T - Ma'lumotlar turi
 */
export interface ApiResponse<T = unknown> {
  data: T;
  message?: string;
  status: boolean;
}

/**
 * Xatolik javobi uchun interfeys
 */
export interface ErrorResponse {
  _data: {
    data: Record<string, unknown> | string;
  };
  status?: number;
}

/**
 * Validatsiya xabarlari uchun tur (valid.json fayli uchun)
 */
export type ValidationMessages = Record<string, string>;
