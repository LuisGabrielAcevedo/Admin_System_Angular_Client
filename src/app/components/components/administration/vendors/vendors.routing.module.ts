import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    loadChildren: './vendors-list/vendors-list.module#VendorsListModule'
  },
  {
    path: 'form',
    loadChildren: './vendors-form/vendors-form.module#VendorsFormModule'
  }
];

export const VendorsRouting = RouterModule.forChild(routes);
