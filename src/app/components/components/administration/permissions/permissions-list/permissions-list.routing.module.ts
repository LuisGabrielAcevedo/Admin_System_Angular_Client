import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionsListComponent } from './permissions-list.component';

const routes: Routes = [{
  path: '',
  component: PermissionsListComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})

export class PermissionsListRoutingModule { }
