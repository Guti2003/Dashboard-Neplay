export interface ApiResponse<T> {
  data: T;
}

export interface ApiErrorItem {
  message: string;
  rule?: string;
  field?: string;
}

export interface ApiErrorResponse {
  errors: ApiErrorItem[];
}
