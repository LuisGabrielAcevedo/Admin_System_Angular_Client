import { Component, Input } from '@angular/core';
import { ITableItem, ITableHeader } from '../../table.interfaces';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss']
})
export class CurrencyComponent {
  @Input() item: ITableItem;
  @Input() header: ITableHeader;
}
