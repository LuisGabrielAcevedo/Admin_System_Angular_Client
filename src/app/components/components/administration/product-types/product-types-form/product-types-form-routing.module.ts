import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductTypesFormComponent } from './product-types-form.component';

const routes: Routes = [{
  path: '',
  component: ProductTypesFormComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})

export class ProductTypesFormRoutingModule { }
