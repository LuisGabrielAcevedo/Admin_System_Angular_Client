import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomersFormComponent } from 'src/app/components/components/administration/customers/customers-form/customers-form.component';


const routes: Routes = [{
  path: '',
  component: CustomersFormComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})

export class CustomersFormRoutingModule { }
