import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminsFormComponent } from 'src/app/components/components/administration/admins/admins-form/admins-form.component';

const routes: Routes = [{
  path: '',
  component: AdminsFormComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})

export class AdminsFormRoutingModule { }
