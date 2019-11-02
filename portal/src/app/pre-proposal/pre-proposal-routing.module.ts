import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IdentificationComponent } from './identification/identification.component';
import { SimulationComponent } from './simulation/simulation.component';

const routes: Routes = [
  { path: '', redirectTo: 'identification', pathMatch: 'full' },
  {
    path: 'identification',
    component: IdentificationComponent
  },
  {
    path: 'simulation/:simulation',
    component: SimulationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SimulationRoutingModule {}
