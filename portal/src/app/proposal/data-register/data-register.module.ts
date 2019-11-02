import { AddressSelectorComponent } from './../../shared/ui-components/address-selector/address-selector.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from '@app/shared/directives/directives.module';
import { UiComponentsModule } from '@app/shared/ui-components/ui-components.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import select
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule } from '@ngx-translate/core';
import { NgxCurrencyModule } from 'ngx-currency';
import { NgxMaskModule } from 'ngx-mask';
import { PipesModule } from '../../shared/pipes';
import { AccountComponent } from './account/account.component';
import { CoOwnerComponent } from './co-owner/co-owner.component';
import { DataRegisterRoutingModule } from './data-register-routing.module';
import { DataRegisterComponent } from './data-register.component';
import { OwnerComponent } from './owner/owner.component';
import { ContactComponent } from './partials/contact/contact.component';
import { PersonalComponent } from './partials/personal/personal.component';
import { ProfessionalComponent } from './partials/professional/professional.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { EnriComponent } from './enri/enri.component';
import { DependencyRelationshipComponent } from './enri/partials/dependency-relationship/dependency-relationship.component';
import { OwnAccountComponent } from './enri/partials/own-account/own-account.component';
import { DoesNotWorkComponent } from './enri/partials/does-not-work/does-not-work.component';

@NgModule({
  declarations: [
    DataRegisterComponent,
    AccountComponent,
    CoOwnerComponent,
    OwnerComponent,
    VehicleComponent,
    PersonalComponent,
    ContactComponent,
    ProfessionalComponent,
    EnriComponent,
    DependencyRelationshipComponent,
    OwnAccountComponent,
    DoesNotWorkComponent
  ],
  imports: [
    CommonModule,
    DataRegisterRoutingModule,
    NgSelectModule,
    NgxMaskModule.forRoot(),
    NgxCurrencyModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule,
    TranslateModule.forChild(),
    UiComponentsModule,
    DirectivesModule
  ],
  providers: []
})
export class DataRegisterModule {}
