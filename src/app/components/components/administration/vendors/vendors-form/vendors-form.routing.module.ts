import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VendorsFormComponent } from 'src/app/components/components/administration/vendors/vendors-form/vendors-form.component';


const routes: Routes = [{
  path: '',
  component: VendorsFormComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})

export class VendorsFormRoutingModule { }
