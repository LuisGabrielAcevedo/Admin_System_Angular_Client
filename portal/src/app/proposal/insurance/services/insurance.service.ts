import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MANUAL_QUOTATION } from '@app/constants/insurance.constants';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  PostInsurancePlanReqDTO,
  PostInsurancePlanResDTO
} from '../models/api/post.insurance';
import { InsurancePlanState } from '../store/insurance.state';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class InsuranceService {
  constructor(private http: HttpClient) {}

  public postInsurance(
    proposalNumber: string,
    plan: InsurancePlanState
  ): Observable<string> {
    return this.http
      .post<PostInsurancePlanResDTO>(
        `${environment.modules.insurance}link-proposal/${proposalNumber}`,
        this.insurancePlanState2PostInsurancePlanReqDTO(plan)
      )
      .pipe(map(res => res.status));
  }

  private insurancePlanState2PostInsurancePlanReqDTO(
    plan: InsurancePlanState
  ): PostInsurancePlanReqDTO {
    return {
      planToken: plan.planToken,
      manualQuotation: plan.productCode === MANUAL_QUOTATION
    };
  }
}
