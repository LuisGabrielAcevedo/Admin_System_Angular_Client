import { TranslateModule } from '@ngx-translate/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldComponent } from './field/field.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormFieldComponent } from './form-field/form-field.component';
import { CellContainerComponent } from './cell/cell.component';
import { ReadonlyComponent } from './readonly/readonly.component';
import { UiHeaderComponent } from './ui-header/ui-header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddressSelectorComponent } from './address-selector/address-selector.component';

@NgModule({
  declarations: [
    FieldComponent,
    FormFieldComponent,
    CellContainerComponent,
    ReadonlyComponent,
    UiHeaderComponent,
    AddressSelectorComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    TranslateModule
  ],
  exports: [
    FieldComponent,
    FormFieldComponent,
    CellContainerComponent,
    ReadonlyComponent,
    UiHeaderComponent,
    AddressSelectorComponent
  ],
  entryComponents: [AddressSelectorComponent]
})
export class UiComponentsModule {}
