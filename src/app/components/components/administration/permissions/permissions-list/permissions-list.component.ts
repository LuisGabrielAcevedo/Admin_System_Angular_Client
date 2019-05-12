import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PermissionSandbox } from 'src/app/sandbox/permission.sandbox';
import {
  TableHeader,
  TablePagination,
  TableOutputItemData, TableButtonAction, TablePaginationDefault
} from '../../../../sharedComponents/table/table.interfaces';
import { filter } from 'rxjs/operators';
import { PermissionsTableHeader, PermissionRowActions } from 'src/app/data/permissionsTable';
import { PermissionService } from '../../../../../services/http/permission.service';

@Component({
  selector: 'app-permissions-list',
  templateUrl: './permissions-list.component.html',
  styleUrls: ['./permissions-list.component.css']
})
export class PermissionsListComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  data: object[];
  headers: TableHeader[] = PermissionsTableHeader;
  loading = false;
  rowActions: TableButtonAction[] = [];
  multiActions: TableButtonAction[] = [];
  pagination: TablePagination = TablePaginationDefault;
  constructor(
    private permissionSandbox: PermissionSandbox,
    private permissionService: PermissionService
  ) {
    this.rowActions = this.permissionService.getRowActions();
    this.multiActions = this.permissionService.getMultiActions();
  }

  ngOnInit() {
    this.loadPermissions();
    this.subscriptions.push(
      this.permissionSandbox.fetchPermissions()
        .subscribe(permissions => {
          this.data = permissions;
        }),
      this.permissionSandbox.fetchIsLoadingPermissions()
        .subscribe(loading => {
          this.loading = loading;
        }),
      this.permissionSandbox.fetchPagination()
        .pipe(filter(pagination => pagination !== null))
        .subscribe(pagination => {
          this.pagination = pagination;
        })
    );
  }

  loadPermissions() {
    this.permissionSandbox.loadPermissions();
  }

  changePageAction(newPagination: TablePagination) {
    this.permissionSandbox.changePagination(newPagination);
  }

  itemSelectedAction(data: TableOutputItemData) {
    if (data.action === 'delete') {
      this.permissionSandbox.deletePermission(data.item);
    }
  }

  search(value: string) {
    this.permissionSandbox.changeSearchValue(value);
  }

  reloadData() {
    this.permissionSandbox.loadPermissions();
  }

  ngOnDestroy() {
    this.permissionSandbox.resetLoadRequest();
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
