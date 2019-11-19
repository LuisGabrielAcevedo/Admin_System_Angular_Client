import { Component, Input } from '@angular/core';
import { ITableHeader, ITableItem } from '../../table.interfaces';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss']
})
export class DateComponent {
  @Input() item: ITableItem;
  @Input() header: ITableHeader;
}
