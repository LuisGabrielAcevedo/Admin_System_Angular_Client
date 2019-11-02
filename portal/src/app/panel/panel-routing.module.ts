import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PanelDetailComponent } from './panel-detail/panel-detail.component';
import { ProposalsComponent } from './proposals/proposals.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'proposals'
  },
  { path: 'proposals', component: ProposalsComponent },

  { path: 'detail/:proposal', component: PanelDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanelRoutingModule {}
