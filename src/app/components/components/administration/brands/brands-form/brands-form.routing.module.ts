import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrandsFormComponent } from './brands-form.component';

const routes: Routes = [{
  path: '',
  component: BrandsFormComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})

export class BrandsFormRoutingModule { }