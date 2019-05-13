import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    loadChildren: './products-list/products-list.module#ProductsListModule'
  },
  {
    path: 'form',
    loadChildren: './products-form/products-form.module#ProductsFormModule'
  },
  {
    path: 'form/:id',
    loadChildren: './products-form/products-form.module#ProductsFormModule'
  }
];

export const ProductsRouting = RouterModule.forChild(routes);
