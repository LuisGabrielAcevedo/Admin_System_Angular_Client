import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageableRejectionRoutingModule } from './manageable-rejection-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { UiComponentsModule } from '@app/shared/ui-components/ui-components.module';
import { ChecklistModule } from '@app/shared/checklist/checklist.module';

import { ManageableRejectionComponent } from './manageable-rejection.component';
import { CommentsComponent } from './comments/comments.component';
import { FormalizationModule } from '../formalization/formalization.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ManageableRejectionComponent, CommentsComponent],
  imports: [
    CommonModule,
    ManageableRejectionRoutingModule,
    TranslateModule.forChild(),
    UiComponentsModule,
    ChecklistModule,
    FormalizationModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ManageableRejectionModule {}
