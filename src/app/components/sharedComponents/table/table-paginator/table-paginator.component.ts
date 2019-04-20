import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { TablePagination } from '../table.interfaces';
import {PageEvent} from '@angular/material';

@Component({
  selector: 'app-table-paginator',
  templateUrl: './table-paginator.component.html',
  styleUrls: ['./table-paginator.component.css']
})
export class TablePaginatorComponent implements OnInit, OnChanges {
  @Input() tablePagination: TablePagination;
  @Output() changePage: EventEmitter<TablePagination> = new EventEmitter();
  pagination: TablePagination;
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.pagination = this.tablePagination;
  }

  pageParams(page: PageEvent) {
    const currentPage = page.pageIndex + 1;
    const paginationToChange: TablePagination = {
      currentPage: currentPage,
      totalItems: page.length,
      itemsPerPage: page.pageSize
    };
    this.changePage.emit(paginationToChange);
  }

}
