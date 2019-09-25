import { HttpClientPromise } from "./http-client-promise";
import { AxiosInstance } from "axios";

export interface HttpClient {
  setBaseUrl(baseUrl: string): void;

  setHeader(name: string, value: string): void;

  get(url: string): HttpClientPromise;

  delete(url: string): HttpClientPromise;

  head(url: string): HttpClientPromise;

  post(url: string, data?: any): HttpClientPromise;

  put(url: string, data?: any): HttpClientPromise;

  patch(url: string, data?: any): HttpClientPromise;

  getAxiosInstance(): AxiosInstance;
}
