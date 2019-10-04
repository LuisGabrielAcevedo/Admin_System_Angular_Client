import { Type } from "@angular/core";
import { IDynamicTableContainerComponentData } from "../table.interfaces";

export class ComponentItem {
  constructor(
    public component: Type<any>,
    public data: IDynamicTableContainerComponentData
  ) {}
}
