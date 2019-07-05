import { HttpClientPromise } from './http-client-promise';
import { AxiosquentHeaders } from '../../interfaces/axiosquent-headers';

export interface HttpClient {
    setBaseUrl(baseUrl: string): void;

    setHeaders(headers?: AxiosquentHeaders): void;

    setHeader(name: string, value: string): void;

    get(url: string): HttpClientPromise;

    delete(url: string): HttpClientPromise;

    head(url: string): HttpClientPromise;

    post(url: string, data?: any): HttpClientPromise;

    put(url: string, data?: any): HttpClientPromise;

    patch(url: string, data?: any): HttpClientPromise;

    getImplementingClient(): any;
}
