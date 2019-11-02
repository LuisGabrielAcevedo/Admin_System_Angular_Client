import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PledgeRegisterComponent } from './pledge-register.component';

const routes: Routes = [{ path: '', component: PledgeRegisterComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PledgeRegistrationRoutingModule {}
