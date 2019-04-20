import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomersListComponent } from 'src/app/components/components/administration/customers/customers-list/customers-list.component';


const routes: Routes = [{
  path: '',
  component: CustomersListComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})

export class CustomersListRoutingModule { }
