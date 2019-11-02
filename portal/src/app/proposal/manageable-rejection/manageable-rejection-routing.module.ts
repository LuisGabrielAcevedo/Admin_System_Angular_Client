import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageableRejectionComponent } from './manageable-rejection.component';

const routes: Routes = [{ path: '', component: ManageableRejectionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageableRejectionRoutingModule {}
