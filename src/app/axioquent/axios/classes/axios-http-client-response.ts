import {AxiosResponse} from 'axios';
import { HttpClientResponse } from '../interfaces/http-client-response';
import { HttpClientHeaders } from '../interfaces/http-client-headers';
import { AxiosquentPagination } from '../../interfaces/axiosquent-pagination';

export class AxiosHttpClientResponse implements HttpClientResponse {
    private axiosResponse: AxiosResponse;
    constructor(axiosResponse: AxiosResponse) {
        this.axiosResponse = axiosResponse;
    }

    getData(): any {
        return this.axiosResponse.data.data ? this.axiosResponse.data.data : this.axiosResponse.data;
    }

    getPagination() {
        const headers: HttpClientHeaders = this.axiosResponse.headers;
        const pagination: AxiosquentPagination = {};
        if (headers['x-current-page']) { pagination.current_page = +headers['x-current-page']; }
        if (headers['x-per-page']) { pagination.per_page = +headers['x-per-page']; }
        if (headers['x-prev-page']) { pagination.prev_page = +headers['x-prev-page']; }
        if (headers['x-total-count']) { pagination.total_count = +headers['x-total-count']; }
        if (headers['x-total-pages']) { pagination.total_pages = +headers['x-total-pages']; }
        return Object.keys(pagination).length ? pagination :  null;
    }

    getUnderlying(): any {
        return this.axiosResponse;
    }
}
