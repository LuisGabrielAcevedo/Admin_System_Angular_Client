import { QueryParam } from '../query/query-params';

export class PaginationSpec {
    public page: number | null;
    protected perPage: number;
    protected queryParams: QueryParam[];

    constructor() {
        this.page = null;
        this.perPage = 50;
        this.queryParams = [];
    }

    public getPaginationParameters(): QueryParam[] {
        this.queryParams.push(new QueryParam('page', this.page));
        this.queryParams.push(new QueryParam('per_page', this.perPage));
        return this.queryParams;
    }

    public setPage(value: number) {
        this.page = value;
    }

    public setPerPage(value: number) {
        this.perPage = value;
    }
}
