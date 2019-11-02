import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { RoleGuardService } from './common/guards/role-guard.service';
import { ROLES_ACCESS } from './constants/roles.constants';

const routes: Routes = [
  { path: '', redirectTo: 'pre-proposal', pathMatch: 'full' },
  {
    path: 'pre-proposal',
    loadChildren: './pre-proposal/pre-proposal.module#SimulationModule',
    canActivate: [RoleGuardService],
    data: { roles: ROLES_ACCESS.PRE_PROPOSAL }
  },
  {
    path: 'proposal',
    loadChildren: './proposal/proposal.module#ProposalModule',
    canActivate: [RoleGuardService],
    data: { roles: ROLES_ACCESS.PROPOSAL }
  },
  {
    path: 'panel',
    loadChildren: './panel/panel.module#PanelModule',
    canActivate: [RoleGuardService],
    data: { roles: ROLES_ACCESS.PANEL }
  },
  { path: '**', redirectTo: 'pre-proposal', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      scrollPositionRestoration: 'enabled',
      onSameUrlNavigation: 'reload',
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
