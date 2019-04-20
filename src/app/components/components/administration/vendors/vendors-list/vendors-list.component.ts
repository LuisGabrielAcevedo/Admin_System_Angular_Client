import { Component, OnInit, OnDestroy  } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { TableHeader, TableButtonAction, TablePagination,
  TablePaginationDefault, TableOutputItemData } from 'src/app/components/sharedComponents/table/table.interfaces';
import { VendorsTableHeader, VendorsRowActions } from 'src/app/data/vendorTable';
import { filter } from 'rxjs/operators';
import { IVendor } from 'src/app/inferfaces/vendor';
import { VendorSandbox } from 'src/app/sandbox/vendor.sandbox';


@Component({
  selector: 'app-vendors-list',
  templateUrl: './vendors-list.component.html',
  styleUrls: ['./vendors-list.component.css']
})
export class VendorsListComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  data: IVendor[];
  headers: TableHeader[] = VendorsTableHeader;
  loading = false;
  rowActions: TableButtonAction[] = VendorsRowActions;
  pagination: TablePagination = TablePaginationDefault;

  constructor(private vendorSandbox: VendorSandbox) { }

  ngOnInit() {
    this.loadVendors();
    this.subscriptions.push(
      this.vendorSandbox.fetchVendors()
        .subscribe(vendors => {
          this.data = vendors;
          console.log(this.data);
        }),
      this.vendorSandbox.fetchIsLoadingVendors()
        .subscribe(loading => {
          this.loading = loading;
        }),
      this.vendorSandbox.fetchPagination()
        .pipe(filter(pagination => pagination !== null))
        .subscribe(pagination => {
          this.pagination = pagination;
        })
    );
  }

  loadVendors() {
    this.vendorSandbox.loadVendors();
  }

  itemSelectedAction(data: TableOutputItemData) {
    if (data.action === 'delete') {
      this.vendorSandbox.deleteVendor(data.item);
    }
  }

  changePageAction(newPagination: TablePagination) {
    this.vendorSandbox.changePagination(newPagination);
  }

  search(value: string) {
    this.vendorSandbox.changeSearchValue(value);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
