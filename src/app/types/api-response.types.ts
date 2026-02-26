export interface IBaseResponse {
  message: string;
}

export interface HttpResponse extends IBaseResponse {
  statusCode: number;
  success: boolean;
  timestamp: string;
}

export interface IErrorResponse extends HttpResponse {
  path: string;
}

// use this insted of IBasicResponseData
export interface ISuccessResponse<T> extends HttpResponse {
  data?: T;
}
