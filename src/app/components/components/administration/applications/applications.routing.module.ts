import { Routes, RouterModule } from '@angular/router';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    loadChildren: './applications-list/applications-list.module#ApplicationsListModule'
  },
  {
    path: 'form',
    loadChildren: './applications-form/applications-form.module#ApplicationsFormModule'
  },
  {
    path: 'form/:id',
    loadChildren: './applications-form/applications-form.module#ApplicationsFormModule'
  }
];

export const ApplicationsRouting = RouterModule.forChild(routes);
