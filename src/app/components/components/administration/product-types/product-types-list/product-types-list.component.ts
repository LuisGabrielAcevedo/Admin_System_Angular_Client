import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { TableHeader, TablePagination, TablePaginationDefault } from 'src/app/components/sharedComponents/table/table.interfaces';
import { ProductTypesTableHeader, ProductTypesRowActions } from 'src/app/data/productTypesTable';
import { ProductTypeSandbox } from 'src/app/sandbox/productType.sandbox';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-product-types-list',
  templateUrl: './product-types-list.component.html',
  styleUrls: ['./product-types-list.component.css']
})
export class ProductTypesListComponent implements OnInit, OnDestroy  {
  subscriptions: Subscription[] = [];
  data: object[];
  headers: TableHeader[] = ProductTypesTableHeader;
  loading = false;
  rowActions = ProductTypesRowActions;
  pagination: TablePagination = TablePaginationDefault;
  constructor(private productTypesSandbox: ProductTypeSandbox) { }


  ngOnInit() {
    this.loadProductTypes();
    this.subscriptions.push(
      this.productTypesSandbox.fetchProductTypes()
        .subscribe(brands => {
          this.data = brands;
          console.log(this.data);
        }),

      this.productTypesSandbox.fetchIsLoadingProductTypes()
        .subscribe(loading => {
          this.loading = loading;
          console.log(this.loading);
        }),
        this.productTypesSandbox.fetchPagination()
        .pipe(filter(pagination => pagination !== null))
        .subscribe(pagination => {
          this.pagination = pagination;
        })
    );
  }


  loadProductTypes() {
    this.productTypesSandbox.loadProductTypes();
  }

  changePageAction(newPagination: TablePagination) {
    this.productTypesSandbox.changePagination(newPagination);
  }

  search(value: string) {
    this.productTypesSandbox.changeSearchValue(value);
  }

  itemSelectedAction(data: any) {
    if (data.action === 'delete') {
      this.productTypesSandbox.deleteProductType(data.item);
    }
  }


  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
