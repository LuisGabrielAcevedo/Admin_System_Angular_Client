import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { InstallmentValue } from '../api/installmentValue';
import { Indexer } from '../api/indexer';
import { URLSearchParams } from 'url';
import { CouponResponse } from '../api/couponResponse';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ModalService } from '../../common/modal/modal.service';
import { EXPIRED_TOKEN_MESSAGE } from '@app/constants/error.constants';

@Injectable({ providedIn: 'root' })
export class SimulationService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private modalService: ModalService,
    private translate: TranslateService
  ) {}

  /**
   *
   * @param id identificationCode
   * @param financedAmount  Amount to finance coming from the screen
   * @param maxInstallmentValue Max value of installment
   */
  public getTerms(
    matrixCode: string,
    financedAmount: number,
    maxInstallmentValue: number,
    riskEngineMinTerm: number,
    riskEngineMaxTerm: number
  ): Observable<Array<number>> {
    const params = new HttpParams()
      .set('financedAmount', financedAmount.toString())
      .set('maxInstallmentValue', maxInstallmentValue.toString())
      .set('matrixCode', matrixCode)
      .set('riskEngineMinTerm', riskEngineMinTerm.toString())
      .set('riskEngineMaxTerm', riskEngineMaxTerm.toString());
    return this.http.get<Array<number>>(
      `${environment.modules.rates_matching}rates-matching/rates/terms`,
      {
        params
      }
    );
  }

  /**
   * Get the value of the installments for the customer
   * @param rateId from identification
   * @param financedAmount Amount to finance coming from the screen
   * @param selectedTerm Installment selected || Quotas que quieres
   * @param isUva if true add 1 more parameter to the query
   */
  public getInstallmentValues(
    matrixCode: string,
    indexerCode: string,
    financedAmount: number,
    selectedTerm: number,
    isUva?: boolean
  ): Observable<InstallmentValue> {
    let params = new HttpParams()
      .set('financedAmount', financedAmount.toString())
      .set('selectedTerm', selectedTerm.toString())
      .set('matrixCode', matrixCode);
    if (isUva === true) {
      params = params.append('indexerCode', indexerCode);
    }
    return this.http.get<InstallmentValue>(
      `${environment.modules.rates_matching}rates-matching/rates/installment-values`,
      { params }
    );
  }

  /**
   * Indexer return values to be used on the other services
   * @param id identificationCode
   */
  public getIndexer(id: string): Observable<Indexer> {
    return this.http.get<Indexer>(
      `${environment.modules.rates}parametrization/indexers/${id}`
    );
  }

  /**
   * Return all the information of the customer so far (RiskScore, Vehicle, ETC)/
   * {TODO} maybe change for other service we going to use in other screens;
   * @param id identificationCode
   */
  public getIdentification(uuid: number): Observable<any> {
    const params = new HttpParams().set('uuid', uuid.toString());
    return this.http
      .get(`${environment.modules.identification_get}identification`, {
        params
      })
      .pipe(
        catchError(error => {
          if (error.status === 404 && error.error === EXPIRED_TOKEN_MESSAGE) {
            this.tokenHasExpired();
          }
          return of(null);
        })
      );
  }

  public tokenHasExpired(): void {
    const modalRef = this.modalService.error(
      this.translate.instant(
        '@Your simulation has expired. Please enter a new application'
      ),
      '',
      [
        {
          label: this.translate.instant('@Accept'),
          action: () => {
            this.router.navigate([`pre-proposal/identification`]);
          },
          type: 'primary'
        }
      ],
      () => {
        this.router.navigate([`pre-proposal/identification`]);
      },
      false
    );
    modalRef.componentInstance.modalCloseOutput.subscribe(
      (action: () => void) => {
        action();
      }
    );
    modalRef.componentInstance.modalOutput.subscribe((action: () => void) => {
      action();
    });
  }

  public postSimulation(proposta: {}): Observable<any> {
    return this.http.post<any>(
      `${environment.modules.proposal}proposal`,
      proposta
    );
  }

  public getCoupon(
    sellingPointCode: number
  ): Observable<Array<CouponResponse>> {
    const params = new HttpParams().set(
      'sellingPointCode',
      sellingPointCode.toString()
    );
    return this.http.get<Array<CouponResponse>>(
      `${environment.modules.coupons}parametrization/rates/coupons`,
      { params }
    );
  }
}
