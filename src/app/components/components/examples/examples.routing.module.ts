import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'youtube',
    pathMatch: 'full'
  },
  {
    path: 'netflix',
    loadChildren: './netflix/netflix.module#NetflixModule'
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
  },
  {
    path: 'chat',
    loadChildren: './chat/chat.module#ChatModule'
  }
];

export const ExamplesRouting = RouterModule.forChild(routes);
