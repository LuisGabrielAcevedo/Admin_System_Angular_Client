import { Type } from '@angular/core';
import { TableContainerComponentData } from '../table.interfaces';

export class ComponentItem {
    constructor(public component: Type<any>, public data: TableContainerComponentData) { }
}
