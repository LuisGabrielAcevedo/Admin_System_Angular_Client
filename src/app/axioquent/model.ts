import { HttpClient } from "./axios/interfaces/http-client";
import { AxiosHttpClient } from "./axios-http-client";
import { HttpClientResponse } from "./axios/interfaces/http-client-response";
import { Builder } from "./builder";
import { AxiosquentModel } from "./interfaces/axiosquent-model";
import { Observable } from "rxjs";
import { AxiosInstance } from "axios";

export abstract class Model {
  constructor() {
    this.base_url = this.baseUrl();
    if (!Model.httpClient) Model.httpClient = new AxiosHttpClient();
    this.initHttpClient();
  }
  private static httpClient: HttpClient;
  public resource!: string;
  private id: number | string | undefined;
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

  public static orWhere(
    attribute: string,
    value: string,
    type?: string
  ): Builder {
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

  public getResource = (): string => this.resource;

  public getApiId = (): number | string | undefined => this.id;

  public aspects = async (): Promise<any> => {
    const resp: HttpClientResponse = await Model.httpClient.get(
      `${this.getResource()}/aspects`
    );
    return resp.getData();
  };

  private initHttpClient(): void {
    console.log("init");
    Model.httpClient.setBaseUrl(this.baseUrl());
  }

  public static async save(model: AxiosquentModel): Promise<any> {
    return new Builder(this).save(model);
  }

  public static saveRx(model: AxiosquentModel): Observable<any> {
    return new Builder(this).saveRx(model);
  }

  public static async update(
    id: string | number,
    model: AxiosquentModel
  ): Promise<any> {
    return new Builder(this).update(id, model);
  }

  public static updateRx(
    id: string | number,
    model: AxiosquentModel
  ): Observable<any> {
    return new Builder(this).updateRx(id, model);
  }

  public static async destroy(id: number | string): Promise<any> {
    return new Builder(this).destroy(id);
  }

  public static destroyRx(id: number | string): Observable<any> {
    return new Builder(this).destroyRx(id);
  }

  public static getAxiosInstance(): AxiosInstance {
    return new Builder(this).getHttpClient().getAxiosInstance();
  }
}
