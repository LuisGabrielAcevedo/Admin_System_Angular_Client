import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    loadChildren: './users-list/users-list.module#UsersListModule'
  },
  {
    path: 'form',
    loadChildren: './users-form/users-form.module#UsersFormModule'
  },
  {
    path: 'form/:id',
    loadChildren: './users-form/users-form.module#UsersFormModule'
  }
];

export const UsersRouting = RouterModule.forChild(routes);
