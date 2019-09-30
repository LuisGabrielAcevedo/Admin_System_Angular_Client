import { LgxHttpClientPromise } from "./lgx-http-client-promise";
import { AxiosInstance } from "axios";

export interface LgxHttpClient {
  setBaseUrl(baseUrl: string): void;
  setHeader(name: string, value: string): void;
  get(url: string): LgxHttpClientPromise;
  delete(url: string): LgxHttpClientPromise;
  head(url: string): LgxHttpClientPromise;
  post(url: string, data?: any): LgxHttpClientPromise;
  put(url: string, data?: any): LgxHttpClientPromise;
  patch(url: string, data?: any): LgxHttpClientPromise;
  getInstance(): AxiosInstance;
}
