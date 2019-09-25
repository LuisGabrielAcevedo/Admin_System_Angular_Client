import { AxiosRequestConfig } from 'axios';

export interface IRequestEvent {
    request: AxiosRequestConfig;
    id: string;
}

export interface IRequests {
    [key: string]: AxiosRequestConfig
}