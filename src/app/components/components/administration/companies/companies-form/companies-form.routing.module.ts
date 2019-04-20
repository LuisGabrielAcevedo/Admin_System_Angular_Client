import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompaniesFormComponent } from './companies-form.component';

const routes: Routes = [{
  path: '',
  component: CompaniesFormComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})

export class CompaniesFormRoutingModule { }
