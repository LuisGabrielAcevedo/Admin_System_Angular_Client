import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LicensesFormComponent } from './licenses-form.component';


const routes: Routes = [{
  path: '',
  component: LicensesFormComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})

export class LicensesFormRoutingModule { }
