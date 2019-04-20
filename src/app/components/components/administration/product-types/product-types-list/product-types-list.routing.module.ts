import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductTypesListComponent } from './product-types-list.component';

const routes: Routes = [{
  path: '',
  component: ProductTypesListComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})

export class ProductTypesListRoutingModule { }
