import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApplicationSandbox } from 'src/app/sandbox/application.sandbox';
import { Subscription } from 'rxjs';
import { ApplicationsTableHeader, ApplicationsRowActions } from 'src/app/data/applicationsTable';
import { TableHeader, TablePagination, TablePaginationDefault } from 'src/app/components/sharedComponents/table/table.interfaces';
import { filter } from 'rxjs/operators';
import { ApplicationService } from 'src/app/services/http/application.service';

@Component({
  selector: 'app-applications-list',
  templateUrl: './applications-list.component.html',
  styleUrls: ['./applications-list.component.css']
})
export class ApplicationsListComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  data: object[];
  headers: TableHeader[] = ApplicationsTableHeader;
  loading = false;
  rowActions = ApplicationsRowActions;
  pagination: TablePagination = TablePaginationDefault;
  constructor(
    private applicationService: ApplicationService,
    private applicationSandbox: ApplicationSandbox) { }

  ngOnInit() {
    this.loadApplications();
    this.subscriptions.push(
      this.applicationSandbox.fetchApplications()
        .subscribe(applications => {
          this.data = applications;
        }),
      this.applicationSandbox.fetchIsLoadingApplications()
        .subscribe(loading => {
          this.loading = loading;
        }),
      this.applicationSandbox.fetchPagination()
        .pipe(filter(pagination => pagination !== null))
        .subscribe(pagination => {
          this.pagination = pagination;
        })
    );
  }

  changePageAction(newPagination: TablePagination) {
    this.applicationSandbox.changePagination(newPagination);
  }

  loadApplications() {
    this.applicationSandbox.loadApplications();
  }

  search(value: string) {
    this.applicationSandbox.changeSearchValue(value);
  }

  itemSelectedAction(data: any) {
    if (data.action === 'delete') {
      this.applicationSandbox.deleteApplication(data.item);
    }
  }

  ngOnDestroy() {
    this.applicationService.resetLoadRequest();
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
