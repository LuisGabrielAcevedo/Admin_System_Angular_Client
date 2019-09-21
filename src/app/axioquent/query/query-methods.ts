import { Builder } from '../builder';
import { SortDirection } from '../sort/sort-directions';
import { Observable } from 'rxjs';
import { AxiosquentModel } from '../interfaces/axiosquent-model';

export interface QueryMethods {
    find(page: number, perPage: number): Promise<any>;
    findById(id: number): Promise<any>;
    save(model: AxiosquentModel): Promise<any>;
    update(id: string | number, model: AxiosquentModel): Promise<any>;
    destroy(id: string | number): Promise<any>;
    findRx(page: number, perPage: number): Observable<any>;
    findByIdRx(id: number): Observable<any>;
    saveRx(model: AxiosquentModel): Observable<any>;
    updateRx(id: string | number, model: AxiosquentModel): Observable<any>;
    destroyRx(id: string | number): Observable<any>;
    where(attribute: string, value: string): Builder;
    andWhere(attribute: string, value: string): Builder;
    orWhere(attribute: string | string [], value: string, type?: string): Builder;
    orderBy(attribute: string, direction?: SortDirection | string): Builder;
    with(value: string | string[]): Builder;
    option(queryParameter: string, value: string): Builder;
    setUrl(url: string | string[], action?: string): Builder;
    header(name: string, value: string): Builder;
}
