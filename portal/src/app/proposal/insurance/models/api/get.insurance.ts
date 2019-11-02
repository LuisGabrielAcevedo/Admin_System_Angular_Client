export interface GetInsurancePlansReqDTO {
  idProposal: number;
}

export interface InsurancePlanDTO {
  planToken: number;
  insuranceCompanyDescription: string;
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

export interface GetInsurancePlansResDTO {
  insurances: InsurancePlanDTO[];
  manualQuotation: boolean;
}
