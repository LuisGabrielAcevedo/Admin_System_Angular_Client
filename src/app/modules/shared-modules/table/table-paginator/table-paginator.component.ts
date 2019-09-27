import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges
} from "@angular/core";
import { DynamicTablePagination } from "../table.interfaces";
import { PageEvent } from "@angular/material";

@Component({
  selector: "app-table-paginator",
  templateUrl: "./table-paginator.component.html",
  styleUrls: ["./table-paginator.component.css"]
})
export class TablePaginatorComponent implements OnInit, OnChanges {
  @Input() DynamicTablePagination: DynamicTablePagination;
  @Output() changePage: EventEmitter<DynamicTablePagination> = new EventEmitter();
  pagination: DynamicTablePagination;
  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.pagination = this.DynamicTablePagination;
  }

  pageParams(page: PageEvent) {
    const currentPage = page.pageIndex + 1;
    const paginationToChange: DynamicTablePagination = {
      currentPage: currentPage,
      totalItems: page.length,
      itemsPerPage: page.pageSize
    };
    this.changePage.emit(paginationToChange);
  }
}
