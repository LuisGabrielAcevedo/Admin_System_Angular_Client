import { Type } from '@angular/core';
import { ITableItem, ITableHeader } from '../../table.interfaces';

export class TableDynamicComponent {
  constructor(
    public component: Type<any>,
    public item: ITableItem,
    public header: ITableHeader
  ) {}
}
