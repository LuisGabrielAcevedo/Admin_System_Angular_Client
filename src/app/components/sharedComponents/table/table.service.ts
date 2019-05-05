import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TableButtonAction, TableButtonOuputAction, TableOutputItemData, ActiveComponentOutputAction } from './table.interfaces';
import { Router, NavigationExtras } from '@angular/router';

@Injectable()
export class TableService {
    openModal: EventEmitter<TableButtonOuputAction> = new EventEmitter();
    itemToOutput: EventEmitter<TableOutputItemData> = new EventEmitter();
    closeModal: EventEmitter<any> = new EventEmitter();
    activeComponent: EventEmitter<ActiveComponentOutputAction> = new EventEmitter();
    con = 0
    constructor(
        private router: Router,
        private http: HttpClient
    ) {
    }

    buttonActions(button: TableButtonAction, position: number, item: object) {
        // 1. Function
        if (button.event) {
            button.event(item);
        }
        // 2. Open Modal 
        if (button.modal) {
            const data: TableButtonOuputAction = {
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
        // 4. Output item
        if (button.outputItemAction) {
            this.outputItem(button.outputItemAction, item);
        }
        // 5. Active component
        if (button.activeComponet) {
            const data: ActiveComponentOutputAction = {
              activeComponent: button.activeComponet,
              position: position
            };
            this.activeComponent.emit(data);
        }
    }

    outputItem(action: string, item: object) {
        const itemCopy = JSON.parse(JSON.stringify(item));
        this.itemToOutput.emit({
            action: action,
            item: itemCopy
        });
        this.closeModal.emit();
    }

    formatText(item: object, field: string) {
        let text = '';
        if (field.indexOf('.') !== -1) {
            const fieldSplit_1 = field.split('.');
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
                    text = item[fieldSplit_1[0]][fieldSplit_1[1]][fieldSplit_1[2]][fieldSplit_1[3]];
                    break;
            }
            return text;
        } else if (field.indexOf(',') !== -1) {
            const fieldSplit_2 = field.split(',');
            fieldSplit_2.forEach(element => {
                text += item[element] + ' ';
            });
            return text;
        } else if (field.indexOf('/a/') !== -1) {
            const fieldSplit_3 = field.split('/a/');
            text = item[fieldSplit_3[0]] + ' ' + fieldSplit_3[1];
            return text;
        } else if (field.indexOf('/b/') !== -1) {
            const fieldSplit_3 = field.split('/b/');
            text = fieldSplit_3[1] + ' ' + item[fieldSplit_3[0]];
            return text;
        } else if (field.indexOf("[]") !== -1) {
            const fieldSplit5 = field.split("[]");
            item[fieldSplit5[0]].forEach((i) => {
                text = text + " " + i
            });
            return text;
        } else {
            text = item[field];
            return text;
        }
    }
}
