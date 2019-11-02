import { environment } from 'src/environments/environment';
import { PollingService } from './../../shared/services/polling.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PHASES_PROCESS_STATUS } from '../../constants/phases.constants';

@Injectable({
  providedIn: 'root'
})
export class PhaseService {
  routeTryingToGo = '';
  constructor(
    private pollingService: PollingService,
    private http: HttpClient
  ) {}

  getPhasePol(proposalNumber: string) {
    return this.pollingService.doPolling(
      `${environment.modules.proposal}proposal/${proposalNumber}/status`,
      response => {
        const status = response.phaseProcessStatus
          ? response.phaseProcessStatus
          : PHASES_PROCESS_STATUS.ONGOING;
        const statusOk = status === PHASES_PROCESS_STATUS.NOT_RUNNING;
        return !statusOk;
      }
    );
  }
  setRoute(route) {
    this.routeTryingToGo = route;
  }
}
