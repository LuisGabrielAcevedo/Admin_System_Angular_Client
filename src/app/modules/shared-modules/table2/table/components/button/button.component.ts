import { Component, Input } from '@angular/core';
import { ITableAction, ITableItem } from '../../table.interfaces';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() button: ITableAction;
  @Input() item: ITableItem;
  constructor() {}

  buttonActions() {
    if (this.button.clickEvent) {
      this.button.clickEvent(this.item);
    }
  }
}
