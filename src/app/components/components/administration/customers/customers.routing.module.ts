import { Routes, RouterModule } from '@angular/router';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    loadChildren: './customers-list/customers-list.module#CustomersListModule'
  },
  {
    path: 'form',
    loadChildren: './customers-form/customers-form.module#CustomersFormModule'
  },
  {
    path: 'form/:id',
    loadChildren: './customers-form/customers-form.module#CustomersFormModule'
  }
];

export const CustomersRouting = RouterModule.forChild(routes);
