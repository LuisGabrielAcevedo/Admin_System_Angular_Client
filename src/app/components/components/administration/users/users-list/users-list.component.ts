import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserSandbox } from '../../../../../sandbox/user.sandbox';
import { Subscription } from 'rxjs';
import { TableHeader, TableButtonAction,
  TablePagination, TablePaginationDefault, TableOutputItemData } from '../../../../sharedComponents/table/table.interfaces';
import { UsersTableHeader, UsersRowActions } from '../../../../../data/usersTable';
import { UserService } from '../../../../../services/http/user.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  data: object[];
  headers: TableHeader[] = UsersTableHeader;
  loading = false;
  rowActions: TableButtonAction[] = UsersRowActions;
  colors = ['#E3F2FD', '#64B5F6', '#1976D2'];
  pagination: TablePagination = TablePaginationDefault;
  constructor(
    private userSandbox: UserSandbox,
    private httpUserService: UserService
  ) { }

  ngOnInit() {
    this.loadUsers();
    this.subscriptions.push(
      this.userSandbox.fetchUsers()
        .subscribe(users => {
          this.data = users;
        }),
      this.userSandbox.fetchIsLoadingUsers()
        .subscribe(loading => {
          this.loading = loading;
        }),
        this.userSandbox.fetchPagination()
        .pipe(filter(pagination => pagination !== null))
        .subscribe(pagination => {
          this.pagination = pagination;
        })
    );
  }

  loadUsers() {
    this.userSandbox.loadUsers();
  }


  changePageAction(newPagination: TablePagination) {
    this.userSandbox.changePagination(newPagination);
  }

  itemSelectedAction(data: TableOutputItemData) {
    if (data.action === 'delete') {
      this.userSandbox.deleteUser(data.item);
    }
  }

  search(value: string) {
    this.userSandbox.changeSearchValue(value);
  }

  ngOnDestroy() {
    this.httpUserService.resetLoadRequest();
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}



