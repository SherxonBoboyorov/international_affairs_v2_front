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
    data?: Record<string, unknown> | string;
    error?: Record<string, unknown> | string;
    errors?: Record<string, unknown> | string;
    message?: string;
  };
  status?: number;
}

export interface Pagination<T> {
  current: number;
  data?: T[];
  items?: T[];
  per_page: number;
  size: number;
  total: number;
}

export type QueryParams = Record<string, QueryValue>;

export type QueryValue = boolean | null | number | string | undefined;

export type ValidationMessages = Record<string, string>;
