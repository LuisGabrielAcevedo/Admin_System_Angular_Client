import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerComponent } from './customer/customer.component';
import { FinancingComponent } from './financing/financing.component';
import { PanelDetailHeaderComponent } from './panel-detail-header/panel-detail-header.component';
import { ProposalDetailComponent } from './proposal-detail.component';
import { VehicleComponent } from './vehicle/vehicle.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { UiComponentsModule } from '@app/shared/ui-components/ui-components.module';
import { NgxMaskModule } from 'ngx-mask';
import { PipesModule } from '@app/shared/pipes';
import { LegendsComponent } from './legends/legends.component';
import { DirectivesModule } from '@app/shared/directives/directives.module';
@NgModule({
  declarations: [
    ProposalDetailComponent,
    CustomerComponent,
    VehicleComponent,
    FinancingComponent,
    PanelDetailHeaderComponent,
    LegendsComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    TranslateModule,
    UiComponentsModule,
    NgxMaskModule,
    PipesModule,
    DirectivesModule
  ],
  exports: [
    ProposalDetailComponent,
    CustomerComponent,
    VehicleComponent,
    FinancingComponent,
    PanelDetailHeaderComponent
  ]
})
export class ProposalDetailModule {}
