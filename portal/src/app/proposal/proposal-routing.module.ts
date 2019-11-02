import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuardService } from '@app/common/guards/role-guard.service';
import { ROLES_ACCESS } from '@app/constants/roles.constants';
import { AppointmentComponent } from './appointment/appointment.component';
import { PledgeRegisterComponent } from './pledge-register/pledge-register.component';
import { ProposalContainerComponent } from './proposal-container/proposal-container.component';

const routes: Routes = [
  { path: '', redirectTo: 'data-register', pathMatch: 'full' },

  {
    path: 'data-register',
    component: ProposalContainerComponent,
    loadChildren: './data-register/data-register.module#DataRegisterModule',
    canActivate: [RoleGuardService],
    data: { roles: ROLES_ACCESS.DATA_REGISTER }
  },
  {
    path: 'insurance',
    component: ProposalContainerComponent,
    loadChildren: './insurance/insurance.module#InsuranceModule',
    canActivate: [RoleGuardService],
    data: { roles: ROLES_ACCESS.INSURANCE }
  },
  {
    path: 'formalization',
    component: ProposalContainerComponent,
    loadChildren: './formalization/formalization.module#FormalizationModule',
    canActivate: [RoleGuardService],
    data: { roles: ROLES_ACCESS.FORMALIZATION }
  },
  {
    path: 'pledge/:proposal',
    component: PledgeRegisterComponent,
    canActivate: [RoleGuardService],
    data: { roles: ROLES_ACCESS.PLEDGE }
  },
  {
    path: 'manageable-rejection/:proposal',
    component: ProposalContainerComponent,
    loadChildren:
      './manageable-rejection/manageable-rejection.module#ManageableRejectionModule',
    canActivate: [RoleGuardService],
    data: { roles: ROLES_ACCESS.MANAGEABLE_REJECTION }
  },
  {
    path: 'appointment',
    component: AppointmentComponent,
    loadChildren: './appointment/appointment.module#AppointmentModule',
    canActivate: [RoleGuardService],
    data: { roles: ROLES_ACCESS.APPOINTMENT }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProposalRoutingModule {}
