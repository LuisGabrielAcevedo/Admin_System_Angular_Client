import {
  Component,
  AfterViewInit,
  QueryList,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  ElementRef,
  ViewChildren,
  ViewChild,
  OnDestroy
} from "@angular/core";
import { Subscription } from "rxjs";
import { MatCheckbox } from "@angular/material/checkbox";
import {
  IDynamicTableHeader,
  IDynamicTableButton,
  IDynamicTableModal,
  IDynamicTableActiveModalAction,
  DynamicITableActiveComponentAction,
  DynamicTablePagination,
  ITableActiveComponent,
  ITableDialog,
  IDynamicTableItem,
  DynamicTableChanges
} from "./table.interfaces";
import { TableService } from "./table.service";
import { MatDialog } from "@angular/material";

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.css"]
})
export class TableComponent implements AfterViewInit, OnChanges, OnDestroy {
  protected boxes: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  protected subscriptions: Subscription[] = [];
  protected openRows: number[] = [];
  protected itemsSelected: IDynamicTableItem[] = [];
  protected checkedAll: boolean = null;
  protected activeSort: string = "";
  protected asc: boolean = false;
  protected modalSelected: IDynamicTableModal = {
    row: 0,
    number: 1
  };
  protected rowSubItemSelected: ITableActiveComponent = {
    row: 0,
    type: ""
  };
  protected tableChanges: DynamicTableChanges = {};
  @Input() headers: IDynamicTableHeader[];
  @Input() data: IDynamicTableItem[];
  @Input() colors: string[] = ["#E3F2FD", "#64B5F6", "#304ffe"];
  @Input() loadingType: string = "BOX";
  @Input() expand: boolean | null = null;
  @Input() index: boolean | null = null;
  @Input() multiSelect: boolean | null = null;
  @Input() loading: boolean | null = null;
  @Input() rowActions: IDynamicTableButton[] = [];
  @Input() multiActions: IDynamicTableButton[] = [];
  @Input() pagination: DynamicTablePagination;
  @Output() DynamicTableChanges: EventEmitter<
    DynamicTableChanges
  > = new EventEmitter();
  @Output() reloadData: EventEmitter<any> = new EventEmitter();
  @ViewChild("tableData") rows: ElementRef;
  @ViewChildren("checkbox") checkboxes: QueryList<MatCheckbox>;
  @ViewChild("mainCheckbox") mainCheckbox: MatCheckbox;

  constructor(public tableService: TableService, public dialog: MatDialog) {}

  ngAfterViewInit() {
    this.subscriptions.push(
      this.tableService.openModal.subscribe(data => {
        this.assignModal(data);
      }),

      this.tableService.closeModal.subscribe(() => {
        this.resetModal();
      }),

      this.tableService.activeComponent.subscribe(data => {
        this.assignActiveComponent(data);
      }),

      this.tableService.openDialog.subscribe(data => {
        this.openDialog(data);
      }),

      this.tableService.reload.subscribe(() => {
        this.reloadData.emit();
      })
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    const data: IDynamicTableItem[] = changes.data
      ? changes.data.currentValue
      : undefined;
    if (data && data.length) {
      this.resetModal();
      this.resetSubItems();
    }
  }

  openRow(i: number) {
    this.rows.nativeElement.children[
      i
    ].style.border = `2px solid ${this.colors[2]}`;
    this.openRows.push(i);
  }

  closeRow(i: number) {
    this.rows.nativeElement.children[i].style.border = "";
    this.openRows.splice(this.openRows.indexOf(i), 1);
  }

  closeAllRows() {
    this.openRows.forEach(row => {
      this.rows.nativeElement.children[row].style.border = "";
    });
    this.openRows = [];
    this.resetSubItems();
  }

  checkedAllAction() {
    this.closeAllRows();
    this.itemsSelected = [];
    this.resetModal();
    this.resetSubItems();
    if (this.checkedAll) {
      this.checkboxes.forEach(checkbox => {
        checkbox.checked = false;
      });
      this.checkedAll = false;
    } else {
      this.checkboxes.forEach(checkbox => {
        checkbox.checked = true;
      });
      this.checkedAll = true;
      this.data.forEach(item => {
        this.itemsSelected.push(item);
      });
    }
  }

  selectItem(i: number) {
    this.closeAllRows();
    this.resetModal();
    this.resetSubItems();
    const item: IDynamicTableItem = this.data[i];
    this.itemsSelected.includes(item)
      ? this.itemsSelected.splice(this.itemsSelected.indexOf(item), 1)
      : this.itemsSelected.push(item);
    if (this.itemsSelected.length === this.data.length) {
      this.checkedAll = true;
      this.mainCheckbox.indeterminate = false;
      this.mainCheckbox.checked = true;
    } else if (
      this.itemsSelected.length > 0 &&
      this.itemsSelected.length < this.data.length
    ) {
      this.mainCheckbox.indeterminate = true;
    } else {
      this.checkedAll = false;
      this.mainCheckbox.indeterminate = false;
      this.mainCheckbox.checked = false;
    }
  }

  unSelectItems() {
    this.checkedAll = false;
    this.itemsSelected = [];
    this.mainCheckbox.indeterminate = false;
    this.mainCheckbox.checked = false;
    this.checkboxes.forEach(checkbox => {
      checkbox.checked = false;
    });
  }

  resetModal() {
    this.modalSelected = {
      row: 0,
      number: 1
    };
    this.closeAllRows();
  }

  resetSubItems() {
    this.rowSubItemSelected = {
      row: 0,
      type: ""
    };
  }

  assignModal(data: IDynamicTableActiveModalAction) {
    this.closeAllRows();
    this.resetSubItems();
    this.modalSelected = data.modal;
    this.modalSelected.row = data.position + 1;
  }

  assignActiveComponent(data: DynamicITableActiveComponentAction) {
    if (!this.openRows.includes(data.position)) {
      this.openRow(data.position);
    }
    this.rowSubItemSelected = data.activeComponent;
    this.rowSubItemSelected.row = data.position + 1;
  }

  openDialog(data: ITableDialog) {
    const dialogRef = this.dialog.open(data.component, {
      width: data.width ? data.width : "300px",
      height: data.height ? data.height : "300px",
      data: data,
      autoFocus: false,
      panelClass: "custom-dialog-container"
    });

    dialogRef.afterClosed().subscribe(resp => {
      if (resp) {
        this.reloadData.emit();
        this.unSelectItems();
      }
      this.resetModal();
      this.resetSubItems();
    });
  }

  changePageAction(newPagination: DynamicTablePagination) {
    this.tableChanges = {
      ...this.tableChanges,
      pagination: newPagination
    };
    this.DynamicTableChanges.emit(this.tableChanges);
  }

  changeSortAction(header: IDynamicTableHeader) {
    if (header.sortable) {
      this.activeSort = header.key;
      this.tableChanges = {
        ...this.tableChanges,
        sort: header.sortable,
        sortDirection: this.asc ? "asc" : "desc"
      };
      this.asc = !this.asc;
      this.DynamicTableChanges.emit(this.tableChanges);
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
