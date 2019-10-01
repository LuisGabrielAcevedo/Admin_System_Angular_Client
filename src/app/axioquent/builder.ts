import { LgxQueryMethods } from "./interfaces/lgx-query-methods";
import { Model } from "./model";
import { Query } from "./query/query";
import { LgxFilter } from "./filter/lgx-filter";
import { SortDirection } from "./sort/sort-directions";
import { SortSpec } from "./sort/sort-spec";
import { Option } from "./option/option";
import { PaginationSpec } from "./pagination/pagination-spec";
import { LgxHttpClient } from "./interfaces/lgx-http-client";
import { UrlSpec } from "./url/url-spec";
import { LgxHeader } from "./header/lgx-header";
import { LgxHttpClientResponse } from "./interfaces/lgx-http-client-response";
import { Observable, from } from "rxjs";
import { ILgxModel } from "./interfaces/lgx-model";

export class Builder implements LgxQueryMethods {
  protected headers: LgxHeader[];
  protected formDataActive: boolean = false;
  private httpClient: LgxHttpClient;
  private query: Query;

  constructor(model: typeof Model) {
    this.headers = [];
    const modelInstance: Model = new (<any>model)();
    this.query = new Query(
      modelInstance.getResource(),
      modelInstance.getQueryConfig()
    );
    this.httpClient = model.getHttpClient();
    this.initPaginationSpec();
  }

  public async find(page?: number, perPage?: number): Promise<any> {
    try {
      this.setHeaders();
      if (page) this.query.getPaginationSpec().setPage(page);
      if (perPage) this.query.getPaginationSpec().setPerPage(perPage);
      const resp: LgxHttpClientResponse = await this.getHttpClient().get(
        this.query.toString()
      );
      return resp.getData();
    } catch (e) {
      return Promise.reject(e.response.data);
    }
  }

  public findRx(page?: number, perPage?: number): Observable<any> {
    return from(this.find(page, perPage));
  }

  public async findById(id: number): Promise<any> {
    try {
      this.setHeaders();
      const resp: LgxHttpClientResponse = await this.getHttpClient().get(
        this.query.toString(id)
      );
      return resp.getData();
    } catch (e) {
      return Promise.reject(e.response.data);
    }
  }

  public findByIdRx(id: number): Observable<any> {
    return from(this.findById(id));
  }

  public async save(model: ILgxModel): Promise<any> {
    try {
      this.setHeaders();
      const resp: LgxHttpClientResponse = await this.getHttpClient().post(
        this.query.toString(),
        model
      );
      return resp.getData();
    } catch (e) {
      return Promise.reject(e.response.data);
    }
  }

  public saveRx(model: ILgxModel): Observable<any> {
    return from(this.save(model));
  }

  public async update(id: string | number, model: ILgxModel): Promise<any> {
    try {
      this.setHeaders();
      const resp: LgxHttpClientResponse = await this.getHttpClient().put(
        this.query.toString(id),
        model
      );
      return resp.getData();
    } catch (e) {
      return Promise.reject(e.response.data);
    }
  }

  public updateRx(id: string | number, model: ILgxModel): Observable<any> {
    return from(this.update(id, model));
  }

  public async destroy(id: string | number): Promise<any> {
    try {
      this.setHeaders();
      const resp: LgxHttpClientResponse = await this.getHttpClient().delete(
        this.query.toString(id)
      );
      return resp.getData();
    } catch (e) {
      return Promise.reject(e.response.data);
    }
  }

  public destroyRx(id: string | number): Observable<any> {
    return from(this.destroy(id));
  }

  public page(page: number): Builder {
    this.query.getPaginationSpec().setPage(page);
    return this;
  }

  public perPage(perPage: number): Builder {
    this.query.getPaginationSpec().setPerPage(perPage);
    return this;
  }

  public filter(attribute: string, value: string): Builder {
    this.query.addFilter(new LgxFilter(attribute, value));
    return this;
  }

  public where(attribute: string, value: string): Builder {
    this.query.addAndFilter(new LgxFilter(attribute, value));
    return this;
  }

  public orWhere(
    attribute: string | string[],
    value: string,
    type?: string
  ): Builder {
    let ats = "";
    if (typeof attribute === "string") {
      ats = attribute as string;
      if (type) ats += `_${type}`;
      this.query.addOrFilter(new LgxFilter(ats, value));
    } else if (Array.isArray(attribute)) {
      for (const a of attribute) {
        ats += !ats ? a : `_or_${a}`;
      }
      if (type) ats += `_${type}`;
      this.query.addOrFilter(new LgxFilter(ats, value));
    } else {
      throw new Error(
        "The argument for 'with' must be a string or an array of strings."
      );
    }
    return this;
  }

  public orderBy(
    attribute: string,
    direction?: SortDirection | string
  ): Builder {
    if (typeof direction === "undefined" || !direction) {
      direction = SortDirection.ASC;
    } else if (typeof direction === "string") {
      if (direction === "asc") {
        direction = SortDirection.ASC;
      } else if (direction === "desc") {
        direction = SortDirection.DESC;
      } else {
        throw new Error(
          "The 'direction' parameter must be string of value 'asc' or 'desc', " +
            "value '" +
            direction +
            "' invalid."
        );
      }
    }
    this.query.addSort(
      new SortSpec(attribute, direction === SortDirection.ASC)
    );
    return this;
  }

  public with(value: string | string[]): Builder {
    if (typeof value === "string") {
      this.query.addInclude(value);
    } else if (Array.isArray(value)) {
      for (const v of value) {
        this.query.addInclude(v);
      }
    } else {
      throw new Error(
        "The argument for 'with' must be a string or an array of strings."
      );
    }
    return this;
  }

  public option(queryParameter: string, value: string): Builder {
    this.query.addOption(new Option(queryParameter, value));
    return this;
  }

  public setUrl(url: string | string[], action?: string): Builder {
    if (typeof url === "string") {
      this.query.setUrl(new UrlSpec(url, action));
    } else if (Array.isArray(url)) {
      let urlFormatted = "";
      for (const u of url) {
        urlFormatted += !urlFormatted ? u : `/${u}`;
      }
      this.query.setUrl(new UrlSpec(urlFormatted, action));
    }
    return this;
  }

  public header(name: string, value: string): Builder {
    this.headers.push(new LgxHeader(name, value));
    return this;
  }

  public noPagination(): Builder {
    this.query.setNoPagination(true);
    return this;
  }

  private setHeaders(): void {
    this.headers.forEach(header => {
      this.getHttpClient().setHeader(header.getName(), header.getValue());
    });
  }

  public formData(): Builder {
    this.formDataActive = true;
    return this;
  }

  private initPaginationSpec(): void {
    this.query.setPaginationSpec(new PaginationSpec());
  }

  public getHttpClient(): LgxHttpClient {
    return this.httpClient;
  }
}
