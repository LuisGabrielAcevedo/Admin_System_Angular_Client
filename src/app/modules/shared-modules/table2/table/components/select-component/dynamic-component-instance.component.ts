import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ComponentFactoryResolver,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { DynamicComponentDirective } from './select-component.directive';
import {
  ETableComponents,
  ITableItem,
  ITableHeader
} from '../../table.interfaces';
import { TextComponent } from '../text/text.component';
import { TableDynamicComponent } from './dynamic-component.component';
import { DateComponent } from '../date/date.component';
import { StatusComponent } from '../status/status.component';
import { DniComponent } from '../dni/dni.component';
import { CurrencyComponent } from '../currency/currency.component';

@Component({
  selector: 'app-dynamic-table-component',
  template: `
    <ng-template app-dynamic-component-table></ng-template>
  `
})
export class DynamicTableSelectComponent implements OnInit, OnChanges {
  @ViewChild(DynamicComponentDirective)
  dynamicComponentDirective: DynamicComponentDirective;
  @Input() component: any;
  @Input() item: ITableItem;
  @Input() header: ITableHeader;
  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    const item: ITableItem = changes.item
      ? changes.item.currentValue
      : undefined;
    const component: ITableItem = changes.component
      ? changes.item.currentValue
      : undefined;
    if (item || component) this.loadComponent();
  }

  loadComponent() {
    const tableComponent: TableDynamicComponent = new TableDynamicComponent(
      this.component
        ? this.component
        : this.selectComponents()[this.header.component],
      this.item,
      this.header
    );
    const componentInstance = this.generateInstance<any>(tableComponent);
    componentInstance.item = tableComponent.item;
    componentInstance.header = tableComponent.header;
  }

  selectComponents() {
    return {
      [ETableComponents.text]: TextComponent,
      [ETableComponents.date]: DateComponent,
      [ETableComponents.status]: StatusComponent,
      [ETableComponents.dni]: DniComponent,
      [ETableComponents.currency]: CurrencyComponent
    };
  }

  private generateInstance<T>(FieldInstanceComponent: TableDynamicComponent) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      FieldInstanceComponent.component
    );
    const viewContainerRef = this.dynamicComponentDirective.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(componentFactory);
    const componentInstance = <T>componentRef.instance;
    return componentInstance;
  }
}
