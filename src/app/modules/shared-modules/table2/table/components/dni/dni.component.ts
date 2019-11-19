import { Component, Input } from '@angular/core';
import { ITableItem, ITableHeader } from '../../table.interfaces';

@Component({
  selector: 'app-dni',
  templateUrl: './dni.component.html',
  styleUrls: ['./dni.component.scss']
})
export class DniComponent {
  @Input() item: ITableItem;
  @Input() header: ITableHeader;

  fomatDni(value: string) {
    return value
      ? value.replace(/([0-9]{1,2})\.?([0-9]{3})\.?([0-9]{3})/, '$1.$2.$3')
      : '--';
  }
}
