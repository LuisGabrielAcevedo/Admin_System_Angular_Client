import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentRoutingModule } from './appointment-routing.module';
import { ProposalDetailModule } from '../proposal-detail/proposal-detail.module';

import { AppointmentComponent } from './appointment.component';
import { DateComponent } from './date/date.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { UiComponentsModule } from '@app/shared/ui-components/ui-components.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppointmentComponent, DateComponent, ConfirmationComponent],
  imports: [
    CommonModule,
    NgbModule,
    TranslateModule,
    UiComponentsModule,
    AppointmentRoutingModule,
    ProposalDetailModule,
    FormsModule
  ]
})
export class AppointmentModule {}
