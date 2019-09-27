import { Routes, RouterModule } from '@angular/router';
import { NetflixComponent } from './netflix.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomeModule',
    component: NetflixComponent
  }
];

export const NetflixRouting = RouterModule.forChild(routes);
