import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from '@app/shared/directives/directives.module';
import { UiComponentsModule } from '@app/shared/ui-components/ui-components.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import select
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule } from '@ngx-translate/core';
import { NouisliderModule } from 'ng2-nouislider';
import { NgxCurrencyModule } from 'ngx-currency';
import { NgxMaskModule } from 'ngx-mask';
import { PipesModule } from '../shared/pipes/pipes.module';
import { SliderComponent } from './components/slider/slider.component';
import { IdentificationComponent } from './identification/identification.component';
import { PreProposalHeaderComponent } from './pre-proposal-header/pre-proposal-header.component';
import { SimulationRoutingModule } from './pre-proposal-routing.module';
import { SimulationComponent } from './simulation/simulation.component';
import { StoreModule } from '@ngrx/store';
import { riskEngineReducerMap } from './store/risk-engine.reducer';
import { initialRiskEngineState } from './store/risk-engine.state';
import { CustomerComponent } from './identification/components/customer/customer.component';
import { VehicleComponent } from './identification/components/vehicle/vehicle.component';

@NgModule({
  declarations: [
    IdentificationComponent,
    SimulationComponent,
    SliderComponent,
    PreProposalHeaderComponent,
    CustomerComponent,
    VehicleComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NouisliderModule,
    SimulationRoutingModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgbModule,
    NgxCurrencyModule,
    NgxMaskModule,
    PipesModule,
    TranslateModule.forChild(),
    UiComponentsModule,
    DirectivesModule,
    StoreModule.forFeature('riskEngine', riskEngineReducerMap, {
      initialState: initialRiskEngineState
    })
  ],
  providers: []
})
export class SimulationModule {}
