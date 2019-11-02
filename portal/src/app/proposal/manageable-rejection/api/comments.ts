export interface CommentRequest {
  date: string;
  message: string;
  type: string;
  user: string;
}

export interface CommentResponse {
  body: {};
  statusCode: string;
  statusCodeValue: number;
}
