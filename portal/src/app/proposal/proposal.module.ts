import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UiComponentsModule } from '@app/shared/ui-components/ui-components.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { ChecklistModule } from '../shared/checklist/checklist.module';
import { PipesModule } from '../shared/pipes/pipes.module';
import { DataRegisterModule } from './data-register/data-register.module';
import { FormalizationModule } from './formalization/formalization.module';
import { ManageableRejectionModule } from './manageable-rejection/manageable-rejection.module';
import { PledgeRegisterModule } from './pledge-register/pledge-register.module';
import { ProposalContainerComponent } from './proposal-container/proposal-container.component';
import { ProposalHeaderComponent } from './proposal-header/proposal-header.component';
import { ProposalRoutingModule } from './proposal-routing.module';
import { InsuranceModule } from './insurance/insurance.module';
import { AppointmentModule } from './appointment/appointment.module';

@NgModule({
  declarations: [ProposalContainerComponent, ProposalHeaderComponent],
  imports: [
    CommonModule,
    ProposalRoutingModule,
    PipesModule,
    NgbModule,
    FormsModule,
    FormalizationModule,
    DataRegisterModule,
    InsuranceModule,
    AppointmentModule,
    ManageableRejectionModule,
    UiComponentsModule,
    TranslateModule.forChild(),
    ChecklistModule,
    PledgeRegisterModule
  ]
})
export class ProposalModule {}
