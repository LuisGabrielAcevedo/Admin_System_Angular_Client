import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from '@app/common/modal';
import {
  ON_BOARDING_ACTIONS,
  ON_BOARDING_RES
} from '@app/constants/onboarding.constants';
import { REASON } from '@app/constants/reasons.constants';
import { PollingService } from '@app/shared/services/polling.service';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OnBoarding, OnBoardingResponse } from '../models/id-onboarding.model';
import { RisckEngineResponseAction } from '../store/risk-engine.actions';

@Injectable({ providedIn: 'root' })
export class OnBoardingService {
  @Output() action: EventEmitter<string> = new EventEmitter();
  public isRetry: boolean = false;
  public uuid: string = '';

  constructor(
    private http: HttpClient,
    private translate: TranslateService,
    private modalService: ModalService,
    private pollingService: PollingService,
    private store: Store<any>,
    private router: Router
  ) {}

  public getOnBoardingStatus(token: string) {
    const onBoardingGetUrl = `${environment.modules.identification}onboarding-gateway?token=${token}`;
    const hasToRetry = (param: OnBoardingResponse) => {
      return (
        param.riskEngineStatus === ON_BOARDING_RES.PENDING ||
        param.riskEngineStatus === ON_BOARDING_RES.SUBMITTED
      );
    };
    let isTokenExpired = true;

    this.modalService.wait(
      this.translate.instant('@Please, wait...'),
      this.translate.instant(this.isRetry ? '@Retrying' : '@Evaluating')
    );

    this.pollingService
      .doPolling(onBoardingGetUrl, hasToRetry, 5000, 10)
      .subscribe(
        (res: OnBoardingResponse) => {
          isTokenExpired = false;
          this.modalService.close();
          this.responseHandler(res, false);
        },
        undefined,
        () => {
          this.modalService.close();
          if (isTokenExpired) {
            this.uuid = '';
            this.pendingResponse();
          }
        }
      );
  }

  public responseHandler(res: OnBoardingResponse, firstTime: boolean): void {
    if (!res || !res.riskEngineStatus || !res.uuid) {
      return this.noResponseError();
    }
    const status = res.riskEngineStatus;
    const reason = res.reason;

    const subOrPen =
      status === ON_BOARDING_RES.SUBMITTED ||
      status === ON_BOARDING_RES.PENDING;

    const approved =
      status === ON_BOARDING_RES.APPROVED ||
      reason === REASON.MANAGEABLE_REJECTION;

    if (firstTime && subOrPen) this.getOnBoardingStatus(res.uuid);

    if (!firstTime && subOrPen) this.pendingResponse();

    if (approved) return this.approvedResponse(res);

    if (status === ON_BOARDING_RES.REJECTED) return this.rejectedResponse(res);
  }

  public noResponseError(): void {
    this.modalService.error(
      this.translate.instant('@Connection failed, try again'),
      ''
    );
  }

  public pendingResponse(): void {
    this.action.emit(ON_BOARDING_ACTIONS.DISABLE);
    this.isRetry = true;
    setTimeout(() => {
      this.modalService.warning(
        this.translate.instant(
          '@Response is unavailable at this moment. Click retry to continue or cancel to re-enter a new proposal'
        ),
        this.translate.instant('@Retry')
      );
    }, 0);
  }

  public rejectedResponse(res: OnBoardingResponse): void {
    if (res.reason) {
      setTimeout(() => {
        this.modalService.warning(
          res.reason,
          this.translate.instant('@Rejected Proposal')
        );
      }, 0);
    } else {
      setTimeout(() => {
        this.modalService.warning(
          this.translate.instant(
            '@We can not process your request. The analysis was not successful'
          ),
          this.translate.instant('@Rejected Proposal')
        );
      }, 0);
    }
    this.action.emit(ON_BOARDING_ACTIONS.RESET);
  }

  public approvedResponse(res: OnBoardingResponse): void {
    this.store.dispatch(new RisckEngineResponseAction(res));
    this.router.navigate(['/pre-proposal/simulation', res.uuid]);
  }

  public postOnBoarding(payload: OnBoarding): Observable<OnBoardingResponse> {
    return this.http.post<OnBoardingResponse>(
      `${environment.modules.identification}onboarding-gateway`,
      payload
    );
  }
}
