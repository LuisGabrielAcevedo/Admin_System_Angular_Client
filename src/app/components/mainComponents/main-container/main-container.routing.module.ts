import { Routes, RouterModule } from '@angular/router';
import { MainContainerComponent } from './main-container.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'examples',
    pathMatch: 'full'
  },
  {
    path: 'examples',
    component: MainContainerComponent,
    loadChildren: 'src/app/components/components/examples/examples.module#ExamplesModule'
  },
  {
    path: 'administration',
    component: MainContainerComponent,
    loadChildren: 'src/app/components/components/administration/administration.module#AdministrationModule'
  }
];

export const MainContainerRouting = RouterModule.forChild(routes);
