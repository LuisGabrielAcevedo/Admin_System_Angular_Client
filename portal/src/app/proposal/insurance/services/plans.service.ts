import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MANUAL_QUOTATION } from '@app/constants/insurance.constants';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import {
  GetInsurancePlanDetailsReqDTO,
  GetInsurancePlanDetailsResDTO
} from '../models/api/get.details';
import { GetInsurancePlansResDTO } from '../models/api/get.insurance';
import { InsurancePlanState, InsuranceState } from '../store/insurance.state';

@Injectable({
  providedIn: 'root'
})
export class PlansService {
  constructor(private http: HttpClient, private translate: TranslateService) {}

  public getPlans(proposalNumber: string): Observable<InsuranceState> {
    return this.http
      .get<GetInsurancePlansResDTO>(
        `${environment.modules.insurance}plans?proposalNumber=${proposalNumber}`,
        { observe: 'response' }
      )
      .pipe(map(res => this.getPlansDTO2InsuranceState(res.body)));
  }

  public getPlanDetails(
    plan: InsurancePlanState,
    proposalNumber: string
  ): Observable<string> {
    const params = this.insurancePlanState2GetInsurancePlanDetailsResDTO(
      plan,
      proposalNumber
    );
    return this.http
      .get<GetInsurancePlanDetailsResDTO>(
        environment.modules.insurance +
          'plans/' +
          params.planCode +
          '/detail' +
          '?insuranceBouquet=' +
          params.insuranceBouquet +
          '&productCode=' +
          params.productCode +
          '&proposalNumber=' +
          params.proposalNumber +
          '&quotationNumber=' +
          params.quotationNumber,
        { observe: 'response' }
      )
      .pipe(
        map(res =>
          res.body.fullDescription
            ? res.body.fullDescription.replace(/\.+/g, '')
            : null
        )
      );
  }

  private insurancePlanState2GetInsurancePlanDetailsResDTO(
    plan: InsurancePlanState,
    proposalNumber: string
  ): GetInsurancePlanDetailsReqDTO {
    const mappedParams = {
      insuranceBouquet: plan.insuranceBouquet,
      planCode: plan.planCode.trim(),
      productCode: plan.productCode.trim(),
      proposalNumber: Number(proposalNumber.trim()),
      quotationNumber: plan.quotationNumber
    };
    return mappedParams;
  }

  private getPlansDTO2InsuranceState(
    getPlansRes: GetInsurancePlansResDTO
  ): InsuranceState {
    if (!getPlansRes) return;
    const mappedPlans = getPlansRes.insurances.map((plan, index) => {
      const planId = index + 2;
      const { insuranceCompanyDescription: name, ...planProperties } = plan;
      const result = { ...planProperties, planId, name };
      return result;
    });

    if (getPlansRes.manualQuotation) {
      mappedPlans.push(this.getManualQuotation());
    }
    return { plans: mappedPlans, selectedPlan: null };
  }

  private getManualQuotation(): InsurancePlanState {
    const manualPlan: InsurancePlanState = {
      planId: 1,
      name: this.translate.instant('@Manual Quotation'),
      productCode: MANUAL_QUOTATION,
      planToken: null,
      coverageType: '',
      installments: null,
      installmentAmount: null,
      quotationNumber: null,
      planCode: '',
      totalPrize: null,
      nextPayment: null,
      insuranceBouquet: null,
      fullDescription: ''
    };
    return manualPlan;
  }
}
