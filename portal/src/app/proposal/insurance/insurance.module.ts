import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxCurrencyModule } from 'ngx-currency';
import { NgxMaskModule } from 'ngx-mask';
import { PipesModule } from '../../shared/pipes';
import { InsuranceRoutingModule } from './insurance-routing.module';
import { InsuranceComponent } from './insurance.component';
import { InsuranceEffects } from './store/insurance.effects';
import { insuranceReducer } from './store/insurance.reducers';
import { initialInsuranceState } from './store/insurance.state';

@NgModule({
  declarations: [InsuranceComponent],
  imports: [
    CommonModule,
    InsuranceRoutingModule,
    NgSelectModule,
    NgxCurrencyModule,
    NgxMaskModule,
    PipesModule,
    NgxDatatableModule,
    NgbModule,
    TranslateModule,
    StoreModule.forFeature('insurance', insuranceReducer, {
      initialState: initialInsuranceState
    }),
    EffectsModule.forFeature([InsuranceEffects])
  ]
})
export class InsuranceModule {}
