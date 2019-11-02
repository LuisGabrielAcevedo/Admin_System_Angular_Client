import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormalizationComponent } from './formalization.component';

const routes: Routes = [
  { path: ':proposal', component: FormalizationComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormalizationRoutingModule {}
