import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionsFormComponent } from './permissions-form.component';

const routes: Routes = [{
  path: '',
  component: PermissionsFormComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})

export class PermissionsFormRoutingModule { }
