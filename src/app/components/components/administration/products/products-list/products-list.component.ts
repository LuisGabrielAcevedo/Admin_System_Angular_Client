import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { ProductSandbox } from 'src/app/sandbox/product.sanbox';
import { ProductsTableHeader, ProductsRowActions } from 'src/app/data/productTable';
import { TableHeader, TableButtonAction, TablePagination, TablePaginationDefault, TableOutputItemData } from 'src/app/components/sharedComponents/table/table.interfaces';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  data: object[];
  headers: TableHeader[] = ProductsTableHeader;
  loading = false;
  rowActions: TableButtonAction[] = ProductsRowActions;
  pagination: TablePagination = TablePaginationDefault;
  constructor(private productSandbox: ProductSandbox ) { }

  ngOnInit() {
    this.loadProducts();
    this.subscriptions.push(
      this.productSandbox.fetchProducts()
        .subscribe(products => {
          this.data = products;
        }),
      this.productSandbox.fetchIsLoadingProducts()
        .subscribe(loading => {
          this.loading = loading;
        }),
      this.productSandbox.fetchPagination()
        .pipe(filter(pagination => pagination !== null))
        .subscribe(pagination => {
          this.pagination = pagination;
        })
    );
  }

  loadProducts() {
    this.productSandbox.loadProducts();
  }

  itemSelectedAction(data: TableOutputItemData) {
    if (data.action === 'delete') {
      this.productSandbox.deleteProduct(data.item);
    }
  }

  changePageAction(newPagination: TablePagination) {
    this.productSandbox.changePagination(newPagination);
  }

  search(value: string) {
    this.productSandbox.changeSearchValue(value);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
