import { Routes, RouterModule } from '@angular/router';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    loadChildren: './roles-list/roles-list.module#RolesListModule'
  },
  {
    path: 'form',
    loadChildren: './roles-form/roles-form.module#RolesFormModule'
  },
  {
    path: 'form/:id',
    loadChildren: './roles-form/roles-form.module#RolesFormModule'
  }
];

export const RolesRouting = RouterModule.forChild(routes);
