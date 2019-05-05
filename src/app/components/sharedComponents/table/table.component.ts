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
  ViewChild
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { MatCheckbox } from '@angular/material/checkbox';
import {
  TableHeader,
  TableButtonAction,
  TableModal,
  TableButtonOuputAction,
  ActiveComponentOutputAction,
  TablePagination,
  TableOutputItemData,
  TableActiveComponent
} from './table.interfaces';
// // @ts-ignore
// import templateDesktop from './table.component.html';
// // @ts-ignore
// import templateMobile from './table.mobile.component.html';
import { TableService } from './table.service';

// const template = window.screen.width < 600 ? templateMobile : templateDesktop;

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements AfterViewInit, OnChanges {
  searchValue = new FormControl();
  private subscriptions: Subscription[] = [];
  openRows: number[] = [];
  itemsSelected: object[] = [];
  checkedAll: boolean = null;
  modalSelected: TableModal = {
    row: 0,
    number: 1
  };
  rowSubItemSelected: TableActiveComponent = {
    row: 0,
    type: ''
  };
  @Input() headers: TableHeader[];
  @Input() data: object[];
  @Input() colors: string[] = ['#E3F2FD', '#64B5F6', '#1976D2'];
  @Input() expand: boolean | null = null;
  @Input() index: boolean | null = null;
  @Input() multiSelect: boolean | null = null;
  @Input() loading: boolean | null = null;
  @Input() rowActions: TableButtonAction[] = [];
  @Input() addRedirect: string;
  @Input() tablePagination: TablePagination;
  @Output() search: EventEmitter<string> = new EventEmitter();
  @Output() changePage: EventEmitter<TablePagination> = new EventEmitter();
  @Output() itemSelected: EventEmitter<TableOutputItemData> = new EventEmitter();
  @ViewChild('tableData') rows: ElementRef;
  @ViewChildren('checkbox') checkboxes: QueryList<MatCheckbox>;
  @ViewChild('mainCheckbox') mainCheckbox: MatCheckbox;

  constructor(public tableService: TableService) {
    this.addRedirect = '';
  }

  ngAfterViewInit() {
    this.subscriptions.push(
      this.searchValue.valueChanges
        .pipe(debounceTime(200))
        .subscribe(newValue => {
          this.search.emit(newValue);
        })
    );

    this.tableService.openModal.subscribe(data => {
      this.assignModal(data);
    })

    this.tableService.closeModal.subscribe(() => {
      this.resetModal();
    })

    this.tableService.itemToOutput.subscribe(data => {
      this.itemSelected.emit(data);
    })

    this.tableService.activeComponent.subscribe(data => {
      this.assignActiveComponent(data);
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  openRow(i: number) {
    this.rows.nativeElement.children[i].style.border = `2px solid ${this.colors[2]}`;
    this.openRows.push(i);
  }

  closeRow(i: number) {
    this.rows.nativeElement.children[i].style.border = '';
    this.openRows.splice(this.openRows.indexOf(i), 1);
  }

  closeAllRows() {
    this.openRows.forEach((row) => {
      this.rows.nativeElement.children[row].style.border = '';
    });
    this.openRows = [];
    this.resetSubItem();
  }

  checkedAllAction() {
    this.closeAllRows();
    this.itemsSelected = [];
    this.resetModal();
    this.resetSubItem();
    if (this.checkedAll) {
      this.checkboxes.forEach((checkbox) => {
        checkbox.checked = false;
      });
      this.checkedAll = false;
    } else {
      this.checkboxes.forEach((checkbox) => {
        checkbox.checked = true;
      });
      this.checkedAll = true;
      this.data.forEach((item) => {
        this.itemsSelected.push(item);
      });
    }
  }

  selectItem(i: number) {
    this.closeAllRows();
    this.resetModal();
    this.resetSubItem();
    const item: object = this.data[i];
    this.itemsSelected.includes(item)
      ? this.itemsSelected.splice(this.itemsSelected.indexOf(item), 1)
      : this.itemsSelected.push(item);
    if (this.itemsSelected.length === this.data.length) {
      this.checkedAll = true;
      this.mainCheckbox.indeterminate = false;
      this.mainCheckbox.checked = true;
    } else if (this.itemsSelected.length > 0 && this.itemsSelected.length < this.data.length) {
      this.mainCheckbox.indeterminate = true;
    } else {
      this.checkedAll = false;
      this.mainCheckbox.indeterminate = false;
      this.mainCheckbox.checked = false;
    }
  }

  unSelectItems() {
    this.itemsSelected = [];
    this.mainCheckbox.indeterminate = false;
    this.mainCheckbox.checked = false;
    this.checkboxes.forEach((checkbox) => {
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

  resetSubItem() {
    this.rowSubItemSelected = {
      row: 0,
      type: ''
    };
  }

  assignModal(data: TableButtonOuputAction) {
    this.closeAllRows();
    this.resetSubItem();
    this.modalSelected = data.modal;
    this.modalSelected.row = data.position + 1;
  }

  assignActiveComponent(data: ActiveComponentOutputAction) {
    this.rowSubItemSelected = data.activeComponent;
    this.rowSubItemSelected.row = data.position + 1;
  }

  changePageAction(newPagination: TablePagination) {
    this.changePage.emit(newPagination);
  }

  formatText(item: object, field: string) {
    return this.tableService.formatText(item, field);
  }
}


