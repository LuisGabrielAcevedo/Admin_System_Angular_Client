import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductCategoriesListComponent } from './product-categories-list.component';

const routes: Routes = [{
  path: '',
  component: ProductCategoriesListComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})

export class ProductCategoriesListRoutingModule { }
