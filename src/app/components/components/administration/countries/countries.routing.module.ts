import { Routes, RouterModule } from '@angular/router';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    loadChildren: './countries-list/countries-list.module#CountriesListModule'
  },
  {
    path: 'form',
    loadChildren: './countries-form/countries-form.module#CountriesFormModule'
  },
  {
    path: 'form/:id',
    loadChildren: './countries-form/countries-form.module#CountriesFormModule'
  }
];

export const CountriesRouting = RouterModule.forChild(routes);
