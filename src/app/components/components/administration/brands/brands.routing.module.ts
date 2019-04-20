import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    loadChildren: './brands-list/brands-list.module#BrandsListModule'
  },
  {
    path: 'form',
    loadChildren: './brands-form/brands-form.module#BrandsFormModule'
  }
];

export const BrandsRouting = RouterModule.forChild(routes);
