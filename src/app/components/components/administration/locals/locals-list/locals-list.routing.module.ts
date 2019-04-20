import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocalsListComponent } from 'src/app/components/components/administration/locals/locals-list/locals-list.component';


const routes: Routes = [{
  path: '',
  component: LocalsListComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})

export class LocalsListRoutingModule { }
