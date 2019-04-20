import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VendorsListComponent } from 'src/app/components/components/administration/vendors/vendors-list/vendors-list.component';


const routes: Routes = [{
  path: '',
  component: VendorsListComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})

export class VendorsListRoutingModule { }
