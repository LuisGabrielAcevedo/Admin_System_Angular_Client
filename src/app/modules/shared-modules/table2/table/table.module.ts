import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { DynamicComponentDirective } from './components/select-component/select-component.directive';
import { TextComponent } from './components/text/text.component';
import { DynamicTableSelectComponent } from './components/select-component/dynamic-component-instance.component';
import { DateComponent } from './components/date/date.component';
import { StatusComponent } from './components/status/status.component';
import { ButtonComponent } from './components/button/button.component';
import { DniComponent } from './components/dni/dni.component';
import { CurrencyComponent } from './components/currency/currency.component';

@NgModule({
  declarations: [
    TableComponent,
    PaginatorComponent,
    DynamicComponentDirective,
    DynamicTableSelectComponent,
    TextComponent,
    DateComponent,
    StatusComponent,
    ButtonComponent,
    DniComponent,
    CurrencyComponent
  ],
  imports: [CommonModule],
  exports: [TableComponent],
  entryComponents: [
    TextComponent,
    DateComponent,
    StatusComponent,
    DniComponent,
    CurrencyComponent
  ]
})
export class TableModule {}
