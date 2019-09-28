import { AxiosHttpClient } from '../../axios-http-client';

export interface HttpClientModel {
    url: string;
    instance: AxiosHttpClient
}