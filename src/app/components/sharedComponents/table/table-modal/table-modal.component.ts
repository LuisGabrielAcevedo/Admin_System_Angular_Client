import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TableModal,
  TableButtonOuputAction,
  TableButtonAction, ActiveComponentOutputAction, TableOutputItemData } from '../table.interfaces';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-table-modal',
  templateUrl: './table-modal.component.html',
  styleUrls: ['./table-modal.component.css']
})
export class TableModalComponent implements OnInit {
  buttonSelected: string;
  @Input() modalData: TableModal;
  @Input() item: object;
  @Input() position: number;
  @Output() closeModal: EventEmitter<any> = new EventEmitter();
  @Output() activeComponent: EventEmitter<ActiveComponentOutputAction> = new EventEmitter();
  @Output() openModal: EventEmitter<TableButtonOuputAction> = new EventEmitter();
  @Output() itemToOutput: EventEmitter<TableOutputItemData> = new EventEmitter();
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  close() {
    this.closeModal.emit();
  }

  buttonActions(button: TableButtonAction) {
    if (button.event) {
      button.event(this.item);
    }
    if (button.modal) {
      const data: TableButtonOuputAction = {
        modal: button.modal,
        position: this.position
      };
      this.openModal.emit(data);
    }
    if (button.activeComponet) {
      this.buttonSelected = button.icon;
      const data: ActiveComponentOutputAction = {
        data: button.activeComponet,
        position: this.position
      };
      this.activeComponent.emit(data);
    }
    if (button.redirectTo) {
      const itemCopy = JSON.parse(JSON.stringify(this.item));
      const navigationExtras: NavigationExtras = {
        queryParams: {
          item: JSON.stringify(itemCopy)
        }
      };
      this.router.navigate([button.redirectTo], navigationExtras);
    }
    if (button.outputItemAction) {
      this.outputItem(button.outputItemAction);
    }
  }

  modalSuccesActions() {
    if (this.modalData.successButtonEvent) {
      this.outputItem(this.modalData.successButtonEvent);
    }
  }

  outputItem(action: string) {
    const itemCopy = JSON.parse(JSON.stringify(this.item));
      this.itemToOutput.emit({
        action: action,
        item: itemCopy
      });
      this.close();
  }
}
