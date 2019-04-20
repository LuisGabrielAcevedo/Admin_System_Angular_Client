import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AdminService } from 'src/app/services/http/admin.service';
import { AdminSandbox } from 'src/app/sandbox/admin.sandbox';
import { AdminsTableHeader, AdminsRowActions } from 'src/app/data/adminsTable';
import {
  TableHeader,
  TablePagination,
  TableButtonAction, TablePaginationDefault, TableOutputItemData
} from 'src/app/components/sharedComponents/table/table.interfaces';

@Component({
  selector: 'app-admins-list',
  templateUrl: './admins-list.component.html',
  styleUrls: ['./admins-list.component.css']
})
export class AdminsListComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  data: object[];
  headers: TableHeader[] = AdminsTableHeader;
  loading = false;
  rowActions: TableButtonAction[] = AdminsRowActions;
  pagination: TablePagination = TablePaginationDefault;
  constructor(
    private adminSandbox: AdminSandbox,
    private adminService: AdminService,
  ) { }

  ngOnInit() {
    this.loadAdmins();
    this.subscriptions.push(
      this.adminSandbox.fetchAdmins()
        .subscribe(admins => {
          this.data = admins;
        }),
      this.adminSandbox.fetchIsLoadingAdmins()
        .subscribe(loading => {
          this.loading = loading;
        }),
      this.adminSandbox.fetchPagination()
        .pipe(filter(pagination => pagination !== null))
        .subscribe(pagination => {
          this.pagination = pagination;
        })
    );
  }

  loadAdmins() {
    this.adminSandbox.loadAdmins();
  }

  changePageAction(newPagination: TablePagination) {
    this.adminSandbox.changePagination(newPagination);
  }

  itemSelectedAction(data: TableOutputItemData) {
    if (data.action === 'delete') {
      this.adminSandbox.deleteAdmin(data.item);
    }
  }

  search(value: string) {
    this.adminSandbox.changeSearchValue(value);
  }

  ngOnDestroy() {
    this.adminService.resetLoadRequest();
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
