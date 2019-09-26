import { Type } from '@angular/core';
import { DynamicTableContainerComponentData } from '../table.interfaces';

export class ComponentItem {
    constructor(public component: Type<any>, public data: DynamicTableContainerComponentData) { }
}
