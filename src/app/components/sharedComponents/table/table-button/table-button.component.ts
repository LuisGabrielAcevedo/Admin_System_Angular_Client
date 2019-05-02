import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { TableButtonAction, TableButtonOuputAction, TableOutputItemData } from '../table.interfaces';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-table-button',
  templateUrl: './table-button.component.html',
  styleUrls: ['./table-button.component.css']
})
export class TableButtonComponent implements OnInit {
  @Input() field: string;
  @Input() item: object;
  @Input() position: number;
  @Input() buttonData: TableButtonAction;
  @Output() openModal: EventEmitter<any> = new EventEmitter();
  @Output() itemToOutput: EventEmitter<TableOutputItemData> = new EventEmitter();
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  buttonActions() {
    if (this.buttonData.event) {
      console.log('aqui');
      this.buttonData.event(this.item);
    }
    if (this.buttonData.modal) {
      const data: TableButtonOuputAction = {
        modal: this.buttonData.modal,
        position: this.position
      };
      this.openModal.emit(data);
    }
    if (this.buttonData.redirectTo) {
      const itemCopy = JSON.parse(JSON.stringify(this.item));
      const navigationExtras: NavigationExtras = {
        queryParams: {
          item: JSON.stringify(itemCopy)
        }
      };
      this.router.navigate([this.buttonData.redirectTo], navigationExtras);
    }
    if (this.buttonData.outputItemAction) {
      const itemCopy = JSON.parse(JSON.stringify(this.item));
      this.itemToOutput.emit({
        action: this.buttonData.outputItemAction,
        item: itemCopy
      });
    }
  }
}
