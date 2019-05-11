import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'companies',
    pathMatch: 'full'
  },
  {
    path: 'users',
    loadChildren: './users/users.module#UsersModule'
  },
  {
    path: 'admins',
    loadChildren: './admins/admins.module#AdminsModule'
  },
  {
    path: 'countries',
    loadChildren: './countries/countries.module#CountriesModule'
  },
  {
    path: 'applications',
    loadChildren: './applications/applications.module#ApplicationsModule'
  },
  {
    path: 'companies',
    loadChildren: './companies/companies.module#CompaniesModule'
  },
  {
    path: 'licenses',
    loadChildren: './licenses/licenses.module#LicensesModule'
  },
  {
    path: 'locals',
    loadChildren: './locals/locals.module#LocalsModule'
  },
  {
    path: 'customers',
    loadChildren: './customers/customers.module#CustomersModule'
  },
  {
    path: 'permissions',
    loadChildren: './permissions/permissions.module#PermissionsModule'
  },
  {
    path: 'roles',
    loadChildren: './roles/roles.module#RolesModule'
  },
  {
    path: 'products',
    loadChildren: './products/products.module#ProductsModule'
  },
  {
    path: 'product-categories',
    loadChildren: './product-categories/product-categories.module#ProductCategoriesModule'
  },
  {
    path: 'product-types',
    loadChildren: './product-types/product-types.module#ProductTypesModule'
  },
  {
    path: 'brands',
    loadChildren: './brands/brands.module#BrandsModule'
  },
  {
    path: 'vendors',
    loadChildren: './vendors/vendors.module#VendorsModule'
  }
];

export const AdministrationRouting = RouterModule.forChild(routes);
