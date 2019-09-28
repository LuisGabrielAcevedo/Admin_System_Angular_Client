import { AxiosInstance } from "axios";
import axios from "axios";
import { HttpClient } from "./axios/interfaces/http-client";
import { HttpClientPromise } from "./axios/interfaces/http-client-promise";
import { AxiosHttpClientPromise } from "./axios/classes/axios-http-client-promise";

export class AxiosHttpClient implements HttpClient {
  private axiosInstance: AxiosInstance;
  constructor(axiosInstance?: AxiosInstance) {
    if (!axiosInstance) axiosInstance = axios.create();
    this.axiosInstance = axiosInstance;
  }

  public setBaseUrl(baseUrl: string): void {
    this.axiosInstance.defaults.baseURL = baseUrl;
  }

  public setHeader(name: string, value: string): void {
    this.axiosInstance.defaults.headers[name] = value;
  }

  public get(url: string): HttpClientPromise {
    return new AxiosHttpClientPromise(this.axiosInstance.get(url));
  }

  public delete(url: string): HttpClientPromise {
    return new AxiosHttpClientPromise(this.axiosInstance.delete(url));
  }

  public head(url: string): HttpClientPromise {
    return new AxiosHttpClientPromise(this.axiosInstance.head(url));
  }

  public post(url: string, data?: any): HttpClientPromise {
    return new AxiosHttpClientPromise(this.axiosInstance.post(url, data));
  }

  public put(url: string, data?: any): HttpClientPromise {
    return new AxiosHttpClientPromise(this.axiosInstance.put(url, data));
  }

  public patch(url: string, data?: any): HttpClientPromise {
    return new AxiosHttpClientPromise(this.axiosInstance.patch(url, data));
  }

  public getInstance(): AxiosInstance {
    return this.axiosInstance;
  }
}
