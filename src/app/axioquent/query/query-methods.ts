import { Builder } from '../builder';
import { SortDirection } from '../sort/sort-directions';

export interface QueryMethods {
    all(page: number, perPage: number): Promise<any>;
    find(id: number): Promise<any>;
    where(attribute: string, value: string): Builder;
    andWhere(attribute: string, value: string): Builder;
    orWhere(attribute: string | string [], value: string, type?: string): Builder;
    orderBy(attribute: string, direction?: SortDirection | string): Builder;
    with(value: string | string[]): Builder;
    option(queryParameter: string, value: string): Builder;
    setUrl(url: string | string[], action?: string): Builder;
    header(name: string, value: string): Builder;
}
