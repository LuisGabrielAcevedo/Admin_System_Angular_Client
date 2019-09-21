import { PaginationSpec } from '../pagination/pagination-spec';
import { FilterSpec } from '../filter/filter-spec';
import { Option } from '../option/option';
import { SortSpec } from '../sort/sort-spec';
import { QueryParam } from './query-params';
import { ClassFilterSpec } from '../filter/class-filter-spec';
import { UrlSpec } from '../url/url-spec';

export class Query {
    protected resource: string;
    protected pagination!: PaginationSpec;
    protected include: string[];
    protected filters: FilterSpec[];
    protected andFilters: FilterSpec[];
    protected orFilters: FilterSpec[];
    protected options: Option[];
    protected sort: SortSpec[];
    protected url: UrlSpec | null;
    protected noPagination: boolean;

    constructor(resource: string) {
        this.resource = resource;
        this.include = [];
        this.filters = [];
        this.andFilters = [];
        this.orFilters = [];
        this.options = [];
        this.sort = [];
        this.url = null;
        this.noPagination = false;
    }

    public addFilter = (filter: FilterSpec): void => {
        this.filters.push(filter);
    }

    public addAndFilter = (filter: FilterSpec): void => {
        this.andFilters.push(filter);
    }

    public addOrFilter = (filter: FilterSpec): void => {
        this.orFilters.push(filter);
    }

    public addSort(sort: SortSpec): void {
        this.sort.push(sort);
    }

    public addInclude(includeSpec: string): void {
        this.include.push(includeSpec);
    }

    public addOption(option: Option): void {
        this.options.push(option);
    }

    public setUrl(url: UrlSpec): void {
        this.url = url;
    }

    public setNoPagination(value: boolean): void {
        this.noPagination = value;
    }

    public setPaginationSpec(paginationSpec: PaginationSpec): void {
        this.pagination = paginationSpec;
    }

    protected addFilterParameters(searchParams: QueryParam[]): void {
        for (const f of this.filters) {
            if (f instanceof ClassFilterSpec) {
                const ff = <ClassFilterSpec>f;
                searchParams.push(new QueryParam(`filter[${ff.getClass()}][${ff.getAttribute()}]`, ff.getValue()));
            } else {
                searchParams.push(new QueryParam(`filter[${f.getAttribute()}]`, f.getValue()));
            }
        }
    }

    protected addOrFilterParameters(searchParams: QueryParam[]): void {
        for (const f of this.orFilters) {
            if (f instanceof ClassFilterSpec) {
                const ff = <ClassFilterSpec>f;
                searchParams.push(new QueryParam(`q[${ff.getClass()}][${ff.getAttribute()}]`, ff.getValue()));
            } else {
                searchParams.push(new QueryParam(`q[${f.getAttribute()}]`, f.getValue()));
            }
        }
    }

    protected addSortParameters(searchParams: QueryParam[]): void {
        if (this.sort.length > 0) {
            let p = '';
            for (const sortSpec of this.sort) {
                if (p) { p += ','; }
                if (!sortSpec.getPositiveDirection()) { p += '-'; }
                p += sortSpec.getAttribute();
            }
            searchParams.push(new QueryParam('sort', p));
        }
    }

    protected addIncludeParameters(searchParams: QueryParam[]): void {
        if (this.include.length > 0) {
            let p = '';
            for (const incl of this.include) {
                if (p !== '') { p += ','; }
                p += incl;
            }
            searchParams.push(new QueryParam('embed', p));
        }
    }

    public getPaginationSpec(): PaginationSpec {
        return this.pagination;
    }

    protected addOptionsParameters(searchParams: QueryParam[]): void {
        for (const option of this.options) {
            searchParams.push(new QueryParam(option.getParameter(), option.getValue()));
        }
    }

    protected addPaginationParameters(searchParams: QueryParam[]): void {
        if (this.noPagination) {
            searchParams.push(new QueryParam('no_pagination', true));
        } else {
            if (this.pagination.page) {
                for (const param of this.pagination.getPaginationParameters()) {
                    searchParams.push(new QueryParam(param.name, param.value));
                }
            }
        }
    }

    protected resetUrl(resource: string): string {
        let url = '';
        if (this.url) {
            url = this.url.getAction() === 'force'
                ? this.url.getUrl()
                : `${resource}/${this.url.getUrl()}`;
        } else {
            url = resource;
        }
        return url;
    }

    public toString(id?: string | number): string {
        let url: string = this.resetUrl(this.resource);

        if (id) { url += `/${id}`; }

        const searchParams: QueryParam[] = [];
        this.addFilterParameters(searchParams);
        this.addSortParameters(searchParams);
        this.addIncludeParameters(searchParams);
        this.addOptionsParameters(searchParams);
        this.addOrFilterParameters(searchParams);
        this.addPaginationParameters(searchParams);

        let paramString = '';

        for (const searchParam of searchParams) {
            paramString += !paramString ? '?' : '&';
            paramString += encodeURIComponent(searchParam.name) + '=' + encodeURIComponent(searchParam.value);
        }
        return url + paramString;
    }
}
