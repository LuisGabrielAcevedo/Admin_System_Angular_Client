import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    loadChildren: './product-types-list/product-types-list.module#ProductTypesListModule'
  },
  {
    path: 'form',
    loadChildren: './product-types-form/product-types-form.module#ProductTypesFormModule'
  }
];

export const ProductTypesRouting = RouterModule.forChild(routes);
