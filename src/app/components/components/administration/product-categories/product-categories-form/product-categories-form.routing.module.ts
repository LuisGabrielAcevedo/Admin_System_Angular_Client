import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductCategoriesFormComponent } from './product-categories-form.component';

const routes: Routes = [{
  path: '',
  component: ProductCategoriesFormComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})

export class ProductCategoriesFormRoutingModule { }
