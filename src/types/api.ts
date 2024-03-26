export type ApiResponse<T> = {
  code: number;
  response: T;
};

export type ApiError = {
  message: string;
  error: string;
};

export type UninterceptedApiError = {
  message: string | Record<string, string[]>;
};

export interface PaginatedApiResponse<T> {
  code: number;
  response: {
    data: T;
    meta: {
      last_page: number;
      total: number;
    };
  };
}
