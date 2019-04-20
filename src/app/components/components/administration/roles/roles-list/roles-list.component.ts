import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { RoleSandbox } from 'src/app/sandbox/role.sandbox';
import {
  TableHeader, TableButtonAction, TablePagination,
  TablePaginationDefault, TableOutputItemData
} from 'src/app/components/sharedComponents/table/table.interfaces';
import { RolesTableHeader, RolesRowActions } from 'src/app/data/rolesTable';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-roles-list',
  templateUrl: './roles-list.component.html',
  styleUrls: ['./roles-list.component.css']
})
export class RolesListComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  data: object[];
  headers: TableHeader[] = RolesTableHeader;
  loading = false;
  rowActions: TableButtonAction[] = RolesRowActions;
  pagination: TablePagination = TablePaginationDefault;

  constructor(private roleSandbox: RoleSandbox) { }

  ngOnInit() {
    this.loadRoles();
    this.subscriptions.push(
      this.roleSandbox.fetchRoles()
        .subscribe(roles => {
          this.data = roles;
        }),
      this.roleSandbox.fetchIsLoadingRoles()
        .subscribe(loading => {
          this.loading = loading;
        }),
      this.roleSandbox.fetchPagination()
        .pipe(filter(pagination => pagination !== null))
        .subscribe(pagination => {
          this.pagination = pagination;
        })
    );
  }

  loadRoles() {
    this.roleSandbox.loadRoles();
  }

  itemSelectedAction(data: TableOutputItemData) {
    if (data.action === 'delete') {
      this.roleSandbox.deleteRole(data.item);
    }
  }

  changePageAction(newPagination: TablePagination) {
    this.roleSandbox.changePagination(newPagination);
  }

  search(value: string) {
    this.roleSandbox.changeSearchValue(value);
  }

  ngOnDestroy() {
    this.roleSandbox.resetLoadRequest();
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
