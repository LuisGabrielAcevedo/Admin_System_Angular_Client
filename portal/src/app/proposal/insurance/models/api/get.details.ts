export interface GetInsurancePlanDetailsReqDTO {
  insuranceBouquet: number;
  planCode: string;
  productCode: string;
  proposalNumber: number;
  quotationNumber: number;
}

export interface GetInsurancePlanDetailsResDTO {
  insuranceBouquet: number;
  planCode: string;
  proposalNumber: number;
  quotationNumber: number;
  fullDescription: string;
}
