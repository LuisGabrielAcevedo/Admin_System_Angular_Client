import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    loadChildren: './companies-list/companies-list.module#CompaniesListModule'
  },
  {
    path: 'form',
    loadChildren: './companies-form/companies-form.module#CompaniesFormModule'
  },
  {
    path: 'form/:id',
    loadChildren: './companies-form/companies-form.module#CompaniesFormModule'
  }
];

export const CompaniesRouting = RouterModule.forChild(routes);
