// import { map, tap } from 'rxjs/operators';
// import { Injectable } from '@angular/core';
// import {
//   ActivatedRouteSnapshot,
//   RouterStateSnapshot,
//   Router
// } from '@angular/router';
// import { CanActivate } from '@angular/router/src/utils/preactivation';
// import { PhaseService } from './phase.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class PhaseGuard implements CanActivate {
//   path: ActivatedRouteSnapshot[];
//   route: ActivatedRouteSnapshot;

//   constructor(private phaseService: PhaseService, private router: Router) {}

//   canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
//     const proposalNumber: string =
//       next.children[0].children[0].children[0].params.proposal; // Just for testing
//     return this.phaseService.getPhase(proposalNumber).pipe(
//       map(response => response.phaseProcessStatus === 'NOT_RUNNING'),
//       tap(phase => {
//         if (!phase) {
//           this.phaseService.setRoute(next.url);
//           this.router.navigate(['/loading']);
//         }
//       })
//     );
//   }
// }
