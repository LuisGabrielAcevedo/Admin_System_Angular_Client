import { Builder } from "../builder";
import { SortDirection } from "../sort/sort-directions";
import { Observable } from "rxjs";
import { ILgxModel } from "./lgx-model";

export interface LgxQueryMethods {
  find(page: number, perPage: number): Promise<any>;
  findById(id: number): Promise<any>;
  save(model: ILgxModel): Promise<any>;
  update(id: string | number, model: ILgxModel): Promise<any>;
  destroy(id: string | number): Promise<any>;
  findRx(page: number, perPage: number): Observable<any>;
  findByIdRx(id: number): Observable<any>;
  saveRx(model: ILgxModel): Observable<any>;
  updateRx(id: string | number, model: ILgxModel): Observable<any>;
  destroyRx(id: string | number): Observable<any>;
  filter(attribute: string, value: string): Builder;
  where(attribute: string, value: string): Builder;
  orWhere(attribute: string | string[], value: string, type?: string): Builder;
  orderBy(attribute: string, direction?: SortDirection | string): Builder;
  with(value: string | string[]): Builder;
  option(queryParameter: string, value: string): Builder;
  setUrl(url: string | string[], action?: string): Builder;
  header(name: string, value: string): Builder;
  page(page: number): Builder;
  perPage(perPage: number): Builder;
  formData(): Builder;
}
