import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    loadChildren: './admins-list/admins-list.module#AdminsListModule'
  },
  {
    path: 'form',
    loadChildren: './admins-form/admins-form.module#AdminsFormModule'
  }
];

export const AdminsRouting = RouterModule.forChild(routes);
