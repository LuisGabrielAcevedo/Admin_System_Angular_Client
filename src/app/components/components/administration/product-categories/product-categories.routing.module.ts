import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    loadChildren: './product-categories-list/product-categories-list.module#ProductCategoriesListModule'
  },
  {
    path: 'form',
    loadChildren: './product-categories-form/product-categories-form.module#ProductCategoriesFormModule'
  }
];

export const ProductCategoriesRouting = RouterModule.forChild(routes);
