import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocalsFormComponent } from 'src/app/components/components/administration/locals/locals-form/locals-form.component';


const routes: Routes = [{
  path: '',
  component: LocalsFormComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})

export class LocalsFormRoutingModule { }
