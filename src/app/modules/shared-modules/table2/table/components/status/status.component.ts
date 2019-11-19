import { Component, Input } from '@angular/core';
import { ITableItem, ITableHeader } from '../../table.interfaces';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent {
  @Input() item: ITableItem;
  @Input() header: ITableHeader;
}
