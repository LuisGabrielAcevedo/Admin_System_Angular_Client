import { Routes, RouterModule } from '@angular/router';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    loadChildren: './locals-list/locals-list.module#LocalsListModule'
  },
  {
    path: 'form',
    loadChildren: './locals-form/locals-form.module#LocalsFormModule'
  }
];

export const LocalsRouting = RouterModule.forChild(routes);
