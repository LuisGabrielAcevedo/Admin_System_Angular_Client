import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LicensesListComponent } from './licenses-list.component';

const routes: Routes = [{
  path: '',
  component: LicensesListComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})

export class LicensesListRoutingModule { }
