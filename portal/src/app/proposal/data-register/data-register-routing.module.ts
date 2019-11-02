import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataRegisterComponent } from './data-register.component';
import { AccountComponent } from './account/account.component';
import { CoOwnerComponent } from './co-owner/co-owner.component';
import { OwnerComponent } from './owner/owner.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { EnriComponent } from './enri/enri.component';

const routes: Routes = [
  {
    path: '',
    component: DataRegisterComponent,
    children: [
      { path: '', redirectTo: 'owner', pathMatch: 'full' },
      {
        path: 'account/:proposal',
        component: AccountComponent
      },
      {
        path: 'coowner/:proposal',
        component: CoOwnerComponent
      },
      {
        path: 'coowner/:proposal/enri',
        component: EnriComponent
      },
      {
        path: 'owner/:proposal',
        component: OwnerComponent
      },
      {
        path: 'owner/:proposal/enri',
        component: EnriComponent
      },
      {
        path: 'vehicle/:proposal',
        component: VehicleComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataRegisterRoutingModule {}
