export interface InsuranceState {
  plans: InsurancePlanState[];
  selectedPlan: InsurancePlanState;
}

export interface InsurancePlanState {
  planId: number;
  planToken: number;
  name: string;
  coverageType: string;
  installments: number;
  installmentAmount: number;
  quotationNumber: number;
  planCode: string;
  totalPrize: number;
  nextPayment: number;
  insuranceBouquet: number;
  productCode: string;
  fullDescription: string;
}

export interface InsuranceDetailsRequestParametersState {
  insuranceBouquet: number;
  planCode: string;
  productCode: string;
  proposalNumber: string;
  quotationNumber: number;
}

export const initialInsuranceState: InsuranceState = {
  plans: [],
  selectedPlan: null
};
