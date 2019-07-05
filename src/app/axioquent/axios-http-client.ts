
import { AxiosInstance } from 'axios';
import axios from 'axios';
import { HttpClient } from './axios/interfaces/http-client';
import { HttpClientPromise } from './axios/interfaces/http-client-promise';
import { AxiosHttpClientPromise } from './axios/classes/axios-http-client-promise';
import { AxiosquentHeaders } from './interfaces/axiosquent-headers';

export class AxiosHttpClient implements HttpClient {
    private axiosInstance: AxiosInstance;

    constructor()
    constructor(axiosInstance?: AxiosInstance) {
        if (axiosInstance === null || axiosInstance === undefined) {
            axiosInstance = axios.create();
        }
        this.axiosInstance = axiosInstance;
    }

    setBaseUrl(baseUrl: string): void {
        this.axiosInstance.defaults.baseURL = baseUrl;
        // this.axiosInstance.defaults.headers['Accept'] = 'application/json';
        // this.axiosInstance.defaults.headers['Content-Type'] = 'application/json';
        // this.axiosInstance.defaults.headers['Allow-Control-Allow-Origin'] = '*';
    }

    setHeaders(headers?: AxiosquentHeaders): void {
        if (headers && Object.keys(headers).length) {
            for (const header of Object.keys(headers)) {
                this.setHeader(header, headers[header]);
            }
        }
    }

    setHeader(name: string, value: string): void {
        this.axiosInstance.defaults.headers[name] = value;
    }

    get(url: string): HttpClientPromise {
        return new AxiosHttpClientPromise(this.axiosInstance.get(url));
    }

    delete(url: string): HttpClientPromise {
        return new AxiosHttpClientPromise(this.axiosInstance.delete(url));
    }

    head(url: string): HttpClientPromise {
        return new AxiosHttpClientPromise(this.axiosInstance.head(url));
    }

    post(url: string, data?: any): HttpClientPromise {
        return new AxiosHttpClientPromise(this.axiosInstance.post(url, data));
    }

    put(url: string, data?: any): HttpClientPromise {
        return new AxiosHttpClientPromise(this.axiosInstance.put(url, data));
    }

    patch(url: string, data?: any): HttpClientPromise {
        return new AxiosHttpClientPromise(this.axiosInstance.patch(url, data));
    }

    public getImplementingClient(): AxiosInstance {
        return this.axiosInstance;
    }
}
