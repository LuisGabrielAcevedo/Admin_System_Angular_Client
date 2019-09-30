import { QueryParam } from "../query/query-params";
import { ILgxQueryConfig } from "../interfaces/lgx-query-config";

export class PaginationSpec {
  public page: number | null;
  protected perPage: number;
  protected queryParams: QueryParam[];

  constructor() {
    this.page = null;
    this.perPage = 10;
    this.queryParams = [];
  }

  public getPaginationParameters(queryConfig: ILgxQueryConfig): QueryParam[] {
    this.queryParams.push(
      new QueryParam(queryConfig["page"] || "page", this.page)
    );
    this.queryParams.push(
      new QueryParam(queryConfig["per_page"] || "per_page", this.perPage)
    );
    return this.queryParams;
  }

  public setPage(value: number) {
    this.page = value;
  }

  public setPerPage(value: number) {
    this.perPage = value;
  }
}
