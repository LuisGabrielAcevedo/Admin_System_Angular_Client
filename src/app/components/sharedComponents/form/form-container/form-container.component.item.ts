import { Type } from '@angular/core';
import { FormContainerComponentData } from '../form.interfaces';

export class ComponentItem {
    constructor(public component: Type<any>, public data: FormContainerComponentData) { }
}
