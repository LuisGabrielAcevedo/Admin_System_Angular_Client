import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    loadChildren: './licenses-list/licenses-list.module#LicensesListModule'
  },
  {
    path: 'form',
    loadChildren: './licenses-form/licenses-form.module#LicensesFormModule'
  },
  {
    path: 'form/:id',
    loadChildren: './licenses-form/licenses-form.module#LicensesFormModule'
  }
];

export const LicensesRouting = RouterModule.forChild(routes);
