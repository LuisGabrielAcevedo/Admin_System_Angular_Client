import { Injectable, EventEmitter } from "@angular/core";
import {
  IDynamicTableButton,
  IDynamicTableActiveModalAction,
  DynamicITableActiveComponentAction,
  ITableDialog
} from "./table.interfaces";
import { Router, NavigationExtras } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class TableService {
  public reload: EventEmitter<any> = new EventEmitter();
  public closeModal: EventEmitter<any> = new EventEmitter();

  public openModal: EventEmitter<
    IDynamicTableActiveModalAction
  > = new EventEmitter();
  public openDialog: EventEmitter<ITableDialog> = new EventEmitter();
  public activeComponent: EventEmitter<
    DynamicITableActiveComponentAction
  > = new EventEmitter();

  constructor(private router: Router) {}

  buttonActions(
    button: IDynamicTableButton,
    position: number,
    item: object | object[]
  ) {
    // 1. Function
    if (button.event) {
      button.event(item);
    }
    // 2. Open Modal
    if (button.modal) {
      const data: IDynamicTableActiveModalAction = {
        modal: button.modal,
        position: position
      };
      this.openModal.emit(data);
    }
    // 3. Redirect
    if (button.redirectTo) {
      const itemCopy = JSON.parse(JSON.stringify(item));
      const navigationExtras: NavigationExtras = {
        queryParams: {
          item: JSON.stringify(itemCopy)
        }
      };
      this.router.navigate([button.redirectTo], navigationExtras);
    }
    // 5. Active component
    if (button.activeComponet) {
      const data: DynamicITableActiveComponentAction = {
        activeComponent: button.activeComponet,
        position: position
      };
      this.activeComponent.emit(data);
    }
    // 6. Active dialog
    if (button.dialog) {
      button.dialog.data.item = item;
      this.openDialog.emit(button.dialog);
    }
  }
}
