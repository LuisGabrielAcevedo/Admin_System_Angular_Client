import { Component, OnInit, OnDestroy } from '@angular/core';
import { TableHeader, TableButtonAction,
  TablePagination, TablePaginationDefault, TableOutputItemData } from '../../../../sharedComponents/table/table.interfaces';
import { UsersTableHeader } from '../../../../../data/usersTable';
import { UserService } from '../../../../../services/http/user.service';
import { IApiResponse } from 'src/app/inferfaces/loadRequest';
import { SnackbarSandbox } from 'src/app/sandbox/snackbar.sandbox';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit, OnDestroy {
  data: object[] = [];
  headers: TableHeader[] = UsersTableHeader;
  loading = false;
  rowActions: TableButtonAction[] = [];
  colors = ['#E3F2FD', '#64B5F6', '#1976D2'];
  pagination: TablePagination = { ...TablePaginationDefault };
  constructor(
    private userService: UserService,
    private snackBarSandbox: SnackbarSandbox,
  ) { 
    this.rowActions = this.userService.getRowActions();
  }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.loading= true;
    this.userService.getUsers().subscribe(resp => this.setData(resp));
  }

  setData(resp: IApiResponse) {
    this.data = resp.data;
    this.pagination = {
      currentPage: resp.currentPage,
      totalItems: resp.totalItems,
      itemsPerPage: resp.itemsPerPage
    }
    this.loading = false;
  }


  changePageAction(newPagination: TablePagination) {
    this.userService.changePagination(newPagination);
    this.loadUsers();
  }

  itemSelectedAction(data: TableOutputItemData) {
    if (data.action === 'delete') {
      this.userService.deleteUser(data.item).subscribe(
        resp => {
          this.snackBarSandbox.sendMessage({action: '', message: resp.msg});
          this.loadUsers();
        },
        error => console.log(error)
      );
    }
  }

  search(value: string) {
    this.userService.changeSearchValue(value);
    this.loadUsers();
  }

  ngOnDestroy() {
    this.userService.resetLoadRequest();
  }
}



