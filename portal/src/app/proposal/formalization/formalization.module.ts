import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UiComponentsModule } from '@app/shared/ui-components/ui-components.module';

import { FormalizationRoutingModule } from './formalization-routing.module';
import { FormalizationComponent } from './formalization.component';
import { ContractComponent } from './components/contract/contract.component';
import { ChecklistComponent } from './components/checklist/checklist.component';
import { RequestComponent } from './components/request/request.component';
import { TranslateModule } from '@ngx-translate/core';
import { ChecklistModule } from '@app/shared/checklist/checklist.module';

@NgModule({
  declarations: [
    FormalizationComponent,
    ContractComponent,
    ChecklistComponent,
    RequestComponent
  ],
  imports: [
    CommonModule,
    FormalizationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    UiComponentsModule,
    TranslateModule.forChild(),
    ChecklistModule
  ],
  exports: [ChecklistComponent]
})
export class FormalizationModule {}
