import { HttpClient } from './axios/interfaces/http-client';
import { AxiosHttpClient } from './axios-http-client';
import { HttpClientResponse } from './axios/interfaces/http-client-response';
import { AttributesMap } from './attribute/attributes.map';
import { Builder } from './builder';
import { AxiosquentHeaders } from './interfaces/axiosquent-headers';
import { AxiosquentModel } from './interfaces/axiosquent-model';
import { Observable, from } from 'rxjs';

export abstract class Model {

    constructor() {
        this.attributes = new AttributesMap();
        this.base_url = this.baseUrl();
        if (!Model.httpClient) { Model.httpClient = new AxiosHttpClient(); }
        this.initHttpClient();
    }
    private static httpClient: HttpClient;
    public resource!: string;
    private id: number | string | undefined;
    private attributes: AttributesMap<any>;
    public base_url!: string;

    public static getHttpClient(): HttpClient {
        return this.httpClient;
    }

    public static find(page?: number, perPage?: number): Promise<any> {
        return new Builder(this).find(page, perPage);
    }

    public static findRx(page?: number, perPage?: number): Observable<any> {
        return new Builder(this).findRx(page, perPage);
    }

    public static findById(id: number): Promise<any> {
        return new Builder(this).findById(id);
    }

    public static findByIdRx(id: number): Observable<any> {
        return new Builder(this).findByIdRx(id);
    }

    public static where(attribute: string, value: any): Builder {
        return new Builder(this).where(attribute, value);
    }

    public static andWhere(attribute: string, value: string): Builder {
        return new Builder(this).andWhere(attribute, value);
    }

    public static orWhere(attribute: string, value: string, type?: string): Builder {
        return new Builder(this).orWhere(attribute, value, type);
    }

    public static orderBy(attribute: string, direction?: string): Builder {
        return new Builder(this).orderBy(attribute, direction);
    }

    public static with(attribute: any): Builder {
        return new Builder(this).with(attribute);
    }

    public static option(queryParameter: string, value: string): Builder {
        return new Builder(this).option(queryParameter, value);
    }

    public static setUrl(url: string, action?: string): Builder {
        return new Builder(this).setUrl(url, action);
    }

    public static header(name: string, value: string): Builder {
        return new Builder(this).header(name, value);
    }

    public static noPagination(): Builder {
        return new Builder(this).noPagination();
    }

    public abstract baseUrl(): string;
    public abstract headers(): AxiosquentHeaders;

    public getResource = (): string => this.resource;

    public getApiId = (): number | string | undefined => this.id;

    public aspects = async (): Promise<any> => {
        const resp: HttpClientResponse = await Model.httpClient.get(`${this.getResource()}/aspects`);
        return resp.getData();
    }

    private initHttpClient(): void {
        Model.httpClient.setBaseUrl(this.baseUrl());
        Model.httpClient.setHeaders(this.headers());
    }
    
    public create(AxiosquentModel: AxiosquentModel): void {
        this.id = AxiosquentModel.id || AxiosquentModel._id || undefined;
        for (const key in AxiosquentModel) {
            this.setAttribute(key, AxiosquentModel[key]);
        }
    }

    public async save(): Promise<any> {
        try {
            const payload: any = this.attributes.toArray();
            const resp: HttpClientResponse = await Model.httpClient.post(this.getResource(), payload);;
            return resp.getData();
        } catch (e) {
            return Promise.reject(e.response.data);
        }
    }

    public saveRx(): Observable<any> {
        return from(this.save());
    }

    public async update(): Promise<any> {
        try {
            const payload: any = this.attributes.toArray();
            const resp: HttpClientResponse = await Model.httpClient.put(this.getResource() + `/${this.id}`, payload);
            return resp.getData();
        }
        catch (e) {
            return Promise.reject(e.response.data);
        }
    }

    public updateRx(): Observable<any> {
        return from(this.update());
    }

    public async destroy(id: number | string): Promise<any> {
        try {
            if (!id) { throw new Error('Cannot delete a model with no ID.'); }
            const resp: HttpClientResponse = await Model.httpClient.delete(this.getResource() + `/${this.id}`);
            return resp.getData();
        } catch (e) {
            return Promise.reject(e.response.data);
        }
    }

    public destroyRx(id: number | string): Observable<any> {
        return from(this.destroy(id));
    }

    protected setAttribute(attributeName: string, value: any): void {
        this.attributes.set(attributeName, value);
    }
}
