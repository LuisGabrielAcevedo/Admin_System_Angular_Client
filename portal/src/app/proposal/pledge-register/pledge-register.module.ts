import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ChecklistModule } from '@app/shared/checklist/checklist.module';
import { PipesModule } from '@app/shared/pipes';
import { UiComponentsModule } from '@app/shared/ui-components/ui-components.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { NgxMaskModule } from 'ngx-mask';
import { PledgeRegistrationRoutingModule } from './pledge-register-routing.module';
import { PledgeRegisterComponent } from './pledge-register.component';
import { ProposalDetailModule } from '../proposal-detail/proposal-detail.module';
@NgModule({
  declarations: [PledgeRegisterComponent],
  imports: [
    CommonModule,
    PledgeRegistrationRoutingModule,
    NgbModule,
    TranslateModule.forChild(),
    UiComponentsModule,
    NgxMaskModule,
    ChecklistModule,
    PipesModule,
    ProposalDetailModule
  ]
})
export class PledgeRegisterModule {}
