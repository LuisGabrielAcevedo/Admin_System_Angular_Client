import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from 'src/app/components/sharedComponents/list/list.component';
import { FormComponent } from 'src/app/components/sharedComponents/form/form.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full'
  },
  {
    path: ':resource',
    component: ListComponent
  },
  {
    path: ':resource/new',
    component: FormComponent
  },
  {
    path: ':resource/edit/:id',
    component: FormComponent
  }
];

export const AdminSystemRouting = RouterModule.forChild(routes);
