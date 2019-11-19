import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  ViewChild,
  OnChanges,
  OnDestroy,
  SimpleChanges
} from '@angular/core';
import {
  ITableHeader,
  ITableItem,
  ITableAction,
  ITablePagintation,
  ITableChanges,
  ITableSort,
  ESortDirection
} from './table.interfaces';
import { Observable, fromEvent, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnChanges, OnDestroy {
  @ViewChild('tableData') public rows: ElementRef;
  @Input() public headers: ITableHeader[] = [];
  @Input() public data: ITableItem[] = [];
  @Input() public loading: boolean = false;
  @Input() public loadingType: string;
  @Input() public showIndex: boolean = false;
  @Input() public expandComponent: any = null;
  @Input() public expandCondition: (arg: any) => boolean;
  @Input() public rowActions: ITableAction[] = [];
  @Input() public autoPagination: number;
  @Input() public pagination: ITablePagintation = null;
  @Input() public table: string = '';
  @Input() public defaultMessage: string = 'No data available';
  @Output() public tableChanges: EventEmitter<
    ITableChanges
  > = new EventEmitter();
  public openRows: number[] = [];
  public openRowsMemory: number[] = [];
  public subscriptions: Subscription[] = [];
  public changes: ITableChanges = {};
  public tableSort: ITableSort = {
    prop: null,
    dir: ESortDirection.asc
  };
  public isMobile: boolean = false;
  public dataToRender: ITableItem[] = [];
  public innerWidthObservable: Observable<number> = fromEvent(
    window,
    'resize'
  ).pipe(
    startWith({ target: { innerWidth: window.innerWidth } }),
    map(event => (event.target as Window).innerWidth)
  );

  ngOnInit() {
    this.subscriptions.push(
      this.innerWidthObservable.subscribe(value => {
        this.isMobile = value < 768;
      })
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    const data: ITableItem[] = changes.data
      ? changes.data.currentValue
      : undefined;
    if (data) {
      if (!this.autoPagination) {
        this.dataToRender = this.isMobile
          ? [...this.dataToRender, ...data]
          : data;
      } else {
        this.pagination = {
          page: 1,
          perPage: this.autoPagination,
          total: data.length
        };
        this.setPaginatedData();
      }
    }
  }

  setPaginatedData() {
    const offset: number = (this.pagination.page - 1) * this.pagination.perPage;
    const data: ITableItem[] = this.data.slice(
      offset,
      offset + this.pagination.perPage
    );
    this.dataToRender = this.isMobile ? [...this.dataToRender, ...data] : data;
  }

  openRow(i: number) {
    this.rows.nativeElement.children[i].style.height = 'auto';
    if (!this.openRowsMemory.includes(i)) this.openRowsMemory.push(i);
    this.openRows.push(i);
  }

  closeRow(i: number) {
    this.rows.nativeElement.children[i].style.height = '43px';
    this.openRows.splice(this.openRows.indexOf(i), 1);
  }

  changePaginationFn(pagination: ITablePagintation) {
    this.tableSort = { prop: '', dir: ESortDirection.asc };
    this.openRowsMemory = [];
    this.openRows = [];
    if (!this.autoPagination) {
      this.tableChanges.emit({
        ...this.changes,
        pagination,
        sort: this.tableSort
      });
    } else {
      this.pagination = pagination;
      this.setPaginatedData();
    }
  }

  changeSort(header: ITableHeader) {
    this.openRowsMemory = [];
    this.openRows = [];
    if (header.sortable) {
      if (header.key === this.tableSort.prop) {
        this.tableSort.dir =
          this.tableSort.dir === ESortDirection.asc
            ? ESortDirection.desc
            : ESortDirection.asc;
      } else {
        this.tableSort.prop = header.key;
      }
      if (!this.autoPagination) {
        this.tableChanges.emit({
          ...this.changes,
          sort: this.tableSort
        });
      } else {
        this.autoSortData();
      }
    }
  }

  autoSortData() {
    this.data = this.data.sort((a, b) => {
      // Sort by strings
      // if (a[this.tableSort.prop] > b[this.tableSort.prop])
      //   return this.tableSort.dir === ESortDirection.asc ? 1 : -1;
      // if (a[this.tableSort.prop] < b[this.tableSort.prop])
      //   return this.tableSort.dir === ESortDirection.asc ? -1 : 1;
      // return 0;

      // Sort by numbers
      const sortFn = b[this.tableSort.prop] - a[this.tableSort.prop];
      return this.tableSort.dir === ESortDirection.asc ? sortFn : sortFn * -1;
    });
    this.pagination = {
      page: 1,
      perPage: this.autoPagination,
      total: this.data.length
    };
    this.setPaginatedData();
  }

  expandConditionFn(item: ITableItem) {
    return this.expandCondition ? this.expandCondition(item) : true;
  }

  resetTable() {
    this.dataToRender = [];
    this.openRows = [];
    this.openRowsMemory = [];
    this.tableSort = {
      prop: null,
      dir: ESortDirection.asc
    };
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
