import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppointmentComponent } from './appointment.component';
import { DateComponent } from './date/date.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'date',
    pathMatch: 'full'
  },
  {
    path: 'date/:proposal',
    component: DateComponent
  },
  {
    path: 'confirmation/:proposal',
    component: ConfirmationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmentRoutingModule {}
