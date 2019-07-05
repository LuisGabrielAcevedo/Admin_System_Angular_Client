import { Routes, RouterModule } from '@angular/router';
import { MainContainerComponent } from './main-container.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'admin-system',
    pathMatch: 'full'
  },
  {
    path: 'examples',
    component: MainContainerComponent,
    loadChildren: 'src/app/components/components/examples/examples.module#ExamplesModule'
  },
  {
    path: 'admin-system',
    component: MainContainerComponent,
    loadChildren: 'src/app/components/components/admin-system/admin-system.module#AdminSystemModule'
  }
];

export const MainContainerRouting = RouterModule.forChild(routes);
