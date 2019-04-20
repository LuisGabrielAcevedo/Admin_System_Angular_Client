import { Routes, RouterModule } from '@angular/router';
import { CartModule } from 'src/app/components/components/examples/cart/cart.module';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'mercado-libre',
    pathMatch: 'full'
  },
  {
    path: 'mercado-libre',
    loadChildren: './mercado-libre/mercado-libre.module#MercadoLibreModule'
  },
  {
    path: 'youtube',
    loadChildren: './youtube/youtube.module#YoutubeModule'
  },
  {
    path: 'cart',
    loadChildren: './cart/cart.module#CartModule'
  }
];

export const ExamplesRouting = RouterModule.forChild(routes);
