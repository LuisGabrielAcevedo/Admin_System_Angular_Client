import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { TableHeader, TablePagination, TablePaginationDefault } from 'src/app/components/sharedComponents/table/table.interfaces';
import { ProductCategoriesTableHeader, ProductCategoriesRowActions } from 'src/app/data/productCategories';
import { ProductCategorySandbox } from 'src/app/sandbox/productCategory.sandBox';
import { filter } from 'rxjs/internal/operators/filter';

@Component({
  selector: 'app-product-categories-list',
  templateUrl: './product-categories-list.component.html',
  styleUrls: ['./product-categories-list.component.css']
})
export class ProductCategoriesListComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  data: object[];
  headers: TableHeader[] = ProductCategoriesTableHeader;
  loading = false;
  rowActions = ProductCategoriesRowActions;
  pagination: TablePagination = TablePaginationDefault;
  constructor(private productCategorySandbox: ProductCategorySandbox) { }

  ngOnInit() {

    this.loadProductCategories();
    this.subscriptions.push(
      this.productCategorySandbox.fetchProductCategories()
        .subscribe(brands => {
          this.data = brands;
          console.log(this.data);
        }),

      this.productCategorySandbox.fetchIsLoadingProductCategories()
        .subscribe(loading => {
          this.loading = loading;
          console.log(this.loading);
        }),
        this.productCategorySandbox.fetchPagination()
        .pipe(filter(pagination => pagination !== null))
        .subscribe(pagination => {
          this.pagination = pagination;
        })
    );
  }

  loadProductCategories() {
    this.productCategorySandbox.loadProductCategories();
  }

  changePageAction(newPagination: TablePagination) {
    this.productCategorySandbox.changePagination(newPagination);
  }

  search(value: string) {
    this.productCategorySandbox.changeSearchValue(value);
  }

  itemSelectedAction(data: any) {
    if (data.action === 'delete') {
      this.productCategorySandbox.deleteProductCategory(data.item);
    }
  }


  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
