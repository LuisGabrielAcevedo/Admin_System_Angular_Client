import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { BrandsTableHeader, BrandsRowActions } from 'src/app/data/brandTable';
import { BrandSandbox } from 'src/app/sandbox/brand.sandBox';
import { filter } from 'rxjs/operators';
import { TableHeader, TablePagination, TablePaginationDefault } from 'src/app/components/sharedComponents/table/table.interfaces';
import { BrandService } from 'src/app/services/http/brand.service';


@Component({
  selector: 'app-brands-list',
  templateUrl: './brands-list.component.html',
  styleUrls: ['./brands-list.component.css']
})
export class BrandsListComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  data: object[];
  headers: TableHeader[] = BrandsTableHeader;
  loading = false;
  rowActions = BrandsRowActions;
  pagination: TablePagination = TablePaginationDefault;

  constructor(
    private brandSandbox: BrandSandbox,
    private brandService: BrandService
  ) { }

  ngOnInit() {
    this.loadBrands();
    this.subscriptions.push(
      this.brandSandbox.fetchBrands()
        .subscribe(brands => {
          this.data = brands;
        }),

      this.brandSandbox.fetchIsLoadingBrands()
        .subscribe(loading => {
          this.loading = loading;
        }),
        this.brandSandbox.fetchPagination()
        .pipe(filter(pagination => pagination !== null))
        .subscribe(pagination => {
          this.pagination = pagination;
        })
    );
  }

  loadBrands() {
    this.brandSandbox.loadBrands();
  }

  changePageAction(newPagination: TablePagination) {
    this.brandSandbox.changePagination(newPagination);
  }

  search(value: string) {
    this.brandSandbox.changeSearchValue(value);
  }

  itemSelectedAction(data: any) {
    if (data.action === 'delete') {
      this.brandSandbox.deleteBrand(data.item);
    }
  }

  ngOnDestroy() {
    this.brandService.resetLoadRequest();
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
