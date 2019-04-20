import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  TableHeader,
  TableButtonAction, TablePagination, TablePaginationDefault, TableOutputItemData
} from 'src/app/components/sharedComponents/table/table.interfaces';
import { LocalsTableHeader, LocalsRowActions } from 'src/app/data/localsTable';
import { LocalSandbox } from 'src/app/sandbox/local.sandbox';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-locals-list',
  templateUrl: './locals-list.component.html',
  styleUrls: ['./locals-list.component.css']
})
export class LocalsListComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  data: object[];
  headers: TableHeader[] = LocalsTableHeader;
  loading = false;
  rowActions: TableButtonAction[] = LocalsRowActions;
  pagination: TablePagination = TablePaginationDefault;
  constructor(private localSandbox: LocalSandbox) { }

  ngOnInit() {
    this.loadLocals();
    this.subscriptions.push(
      this.localSandbox.fetchLocals()
        .subscribe(locals => {
          this.data = locals;
        }),
      this.localSandbox.fetchIsLoadingLocals()
        .subscribe(loading => {
          this.loading = loading;
        }),
      this.localSandbox.fetchPagination()
        .pipe(filter(pagination => pagination !== null))
        .subscribe(pagination => {
          this.pagination = pagination;
        })
    );
  }

  loadLocals() {
    this.localSandbox.loadLocals();
  }

  itemSelectedAction(data: TableOutputItemData) {
    if (data.action === 'delete') {
      this.localSandbox.deleteLocal(data.item);
    }
  }

  changePageAction(newPagination: TablePagination) {
    this.localSandbox.changePagination(newPagination);
  }

  search(value: string) {
    this.localSandbox.changeSearchValue(value);
  }

  ngOnDestroy() {
    this.localSandbox.resetLoadRequest();
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
