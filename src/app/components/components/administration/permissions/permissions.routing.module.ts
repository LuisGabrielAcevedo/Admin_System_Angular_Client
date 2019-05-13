import { Routes, RouterModule } from '@angular/router';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    loadChildren: './permissions-list/permissions-list.module#PermissionsListModule'
  },
  {
    path: 'form',
    loadChildren: './permissions-form/permissions-form.module#PermissionsFormModule'
  },
  {
    path: 'form/:id',
    loadChildren: './permissions-form/permissions-form.module#PermissionsFormModule'
  }
];

export const PermissionsRouting = RouterModule.forChild(routes);
