import { Injectable, EventEmitter } from "@angular/core";
import {
  DynamicTableButtonAction,
  DynamicTableActiveModalAction,
  DynamicTableActiveComponentAction,
  TableDialog
} from "./table.interfaces";
import { Router, NavigationExtras } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class TableService {
  public reload: EventEmitter<any> = new EventEmitter();
  public closeModal: EventEmitter<any> = new EventEmitter();

  public openModal: EventEmitter<
    DynamicTableActiveModalAction
  > = new EventEmitter();
  public openDialog: EventEmitter<TableDialog> = new EventEmitter();
  public activeComponent: EventEmitter<
    DynamicTableActiveComponentAction
  > = new EventEmitter();

  constructor(private router: Router) {}

  buttonActions(
    button: DynamicTableButtonAction,
    position: number,
    item: object | object[]
  ) {
    // 1. Function
    if (button.event) {
      button.event(item);
    }
    // 2. Open Modal
    if (button.modal) {
      const data: DynamicTableActiveModalAction = {
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
      const data: DynamicTableActiveComponentAction = {
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

  formatText(item: object, field: string) {
    let text: any = "";
    if (field.indexOf(".") !== -1) {
      const fieldSplit_1 = field.split(".");
      if (!item[fieldSplit_1[0]]) {
        return text;
      }
      switch (fieldSplit_1.length) {
        case 1:
          text = item[fieldSplit_1[0]];
          break;
        case 2:
          text = item[fieldSplit_1[0]][fieldSplit_1[1]];
          break;
        case 3:
          text = item[fieldSplit_1[0]][fieldSplit_1[1]][fieldSplit_1[2]];
          break;
        case 4:
          text =
            item[fieldSplit_1[0]][fieldSplit_1[1]][fieldSplit_1[2]][
              fieldSplit_1[3]
            ];
          break;
      }
      return text;
    } else if (field.indexOf(",") !== -1) {
      const fieldSplit_2 = field.split(",");
      fieldSplit_2.forEach(element => {
        text += item[element] + " ";
      });
      return text;
    } else if (field.indexOf("/a/") !== -1) {
      const fieldSplit_3 = field.split("/a/");
      text = item[fieldSplit_3[0]] + " " + fieldSplit_3[1];
      return text;
    } else if (field.indexOf("/b/") !== -1) {
      const fieldSplit_3 = field.split("/b/");
      text = fieldSplit_3[1] + " " + item[fieldSplit_3[0]];
      return text;
    } else if (field.indexOf("[]") !== -1) {
      const fieldSplit5 = field.split("[]");
      if (fieldSplit5[1]) {
        item[fieldSplit5[0]].forEach((value, i) => {
          text +=
            i === 0 ? value[fieldSplit5[1]] : `, ${value[fieldSplit5[1]]}`;
        });
      } else {
        item[fieldSplit5[0]].forEach(value => {
          text = text + " " + value;
        });
      }
      return text;
    } else {
      text = item[field];
      return text;
    }
  }
}
