import { Component, OnDestroy, Injector } from "@angular/core";
import { Router, ActivationEnd } from "@angular/router";
import { filter, map } from "rxjs/operators";
import { Subscription } from "rxjs";
import {
  DynamicTableHeader,
  DynamicTableButtonAction,
  DynamicTablePagination,
  DynamicTablePaginationDefault,
  DynamicTableChanges,
  DynamicTableItem
} from "../table/table.interfaces";

import { TranslateService } from "@ngx-translate/core";
import { ELgxSortDirection, ILgx } from "src/app/lgx-axios-dev-tools/index";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"]
})
export class ListComponent implements OnDestroy {
  public subscriptions: Subscription[] = [];
  public data: DynamicTableItem[] = [];
  public loading: boolean;
  public resource: string;
  public modelClass: ILgx;
  public title: string;
  public service: any;
  public headers: DynamicTableHeader[] = [];
  public rowActions: DynamicTableButtonAction[] = [];
  public pagination: DynamicTablePagination = DynamicTablePaginationDefault;
  public sort: string;
  public sortDirection: ELgxSortDirection = ELgxSortDirection.ASC;
  constructor(
    private router: Router,
    private injector: Injector,
    private translateService: TranslateService
  ) {
    this.subscriptions.push(
      this.router.events
        .pipe(
          filter(
            (event: ActivationEnd) =>
              event instanceof ActivationEnd &&
              event.snapshot.params["resource"] &&
              event.snapshot.params["resource"] !== this.resource
          ),
          map(event => event.snapshot.params["resource"])
        )
        .subscribe(resource => {
          this.resource = resource;
          this.sort = null;
          this.pagination = DynamicTablePaginationDefault;
          this.title = `${this.resource.replace("-", "_")}.list.title`;
          this.title = this.translateService.instant(this.title);
          this.initList();
        })
    );
  }

  public async initList() {
    const modelClassModule = await import(
      `src/app/models/admin-system/${this.resource}`
    );
    this.modelClass = modelClassModule.default;
    const headersModule = await import(
      `src/app/metadata/admin-system/table/${this.resource}`
    );
    this.headers = headersModule.default;
    const serviceModule = await import(
      `src/app/services/admin-system/${this.resource}.service`
    );
    this.service = this.injector.get(serviceModule.default);
    this.rowActions = this.service.getRowActions();
    this.loadData();
  }

  public loadData(): void {
    let modelClass = this.modelClass;
    if (this.with()) modelClass = modelClass.with(this.with());
    if (this.sort)
      modelClass = modelClass.orderBy(this.sort, this.sortDirection);
    this.loading = true;
    modelClass
      .page(this.pagination.currentPage)
      .perPage(this.pagination.itemsPerPage)
      .findRx()
      .subscribe(resp => {
        this.pagination = {
          currentPage: resp.currentPage,
          itemsPerPage: resp.itemsPerPage,
          totalItems: resp.totalItems
        };
        this.data = resp.data;
        this.loading = false;
      });
  }

  public with(): string {
    let resource: string = this.resource;
    if (resource.includes("-")) resource = resource.split("-").join("");
    const populateData = {
      users:
        "company,application,userConfigurations.currentStore,userInformation,role",
      companies: "application,country,admin",
      applications: "",
      stores: "country,application,company,storeConfigurations",
      states: "country",
      products: "company",
      vendors: "company",
      brands: "company",
      productcategories: "company",
      producttypes: "company",
      rooms: "company"
    };
    return populateData[resource];
  }

  public goToForm(): void {
    this.router.navigate([`/admin-system/${this.resource}/new`]);
  }

  public dynamicTableChanges(changes: DynamicTableChanges) {
    if (changes.pagination) this.pagination = changes.pagination;
    if (changes.sort) this.sort = changes.sort;
    if (changes.sortDirection)
      this.sortDirection =
        changes.sortDirection === "asc"
          ? ELgxSortDirection.ASC
          : ELgxSortDirection.DESC;
    this.loadData();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
