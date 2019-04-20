import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MercadoLibreComponent } from './mercado-libre.component';

const routes: Routes = [{
  path: '',
  component: MercadoLibreComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})

export class MercadoLibreRoutingModule { }
