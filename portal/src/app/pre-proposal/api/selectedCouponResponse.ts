interface SelectedCouponResponse {
  indexerType: string;
  matrixCode: string;
  rates: Rate2[];
}

interface Rate2 {
  axisCode: string;
  axisEnd: number;
  axisStart: number;
  axisTypeCode: string;
  conditionType: ConditionType;
  creationDate: string;
  descriptionAxis: string;
  indexerCode: string;
  installments: number[];
  longDescriptionMatrix: string;
  matrixCode: string;
  modificationDate: string;
  percentageRate: number;
  productSubproduct: ProductSubproduct;
  rateId: number;
  rateType: string;
  shortDescriptionMatrix: string;
  status: boolean;
  validityEndDate: string;
  validityStartDate: string;
}

interface ConditionType {
  alternativeConditionCode: string;
  conditionDesc: string;
  conditionTypeCode: string;
  creationDate: string;
  idConditionType: number;
  liquidationConditionCode: string;
  modificationDate: string;
  productSubproduct: ProductSubproduct;
  rates: Rate[];
  ratesProductParametrizationList: RatesProductParametrizationList[];
  status: string;
}

interface ProductSubproduct {
  amortizationType: string;
  conditionTypes: null[];
  creationDate: string;
  destinationFunds: DestinationFund[];
  entityCode: string;
  idProdSubprod: number;
  indexationCoef: string;
  modificationDate: string;
  organizationId: number;
  productCode: string;
  productDesc: string;
  productSubproductDesc: string;
  productoType: string;
  rates: Rate[];
  ratesProductParametrizationList: RatesProductParametrizationList[];
  status: boolean;
  subproductCode: string;
  subproductDesc: string;
  validityEndDate: string;
  validityInitDate: string;
  visualCoef: string;
}

interface Rate {
  axisCode: string;
  axisEnd: number;
  axisStart: number;
  axisTypeCode: string;
  creationDate: string;
  descriptionAxis: string;
  indexerCode: string;
  longDescriptionMatrix: string;
  matrixCode: string;
  modificationDate: string;
  percentageRate: number;
  rateId: number;
  rateType: string;
  shortDescriptionMatrix: string;
  status: boolean;
  validityEndDate: string;
  validityStartDate: string;
}

interface DestinationFund {
  alternativeFunds: AlternativeFund[];
  creationDate: string;
  destinationFundCode: string;
  destinationFundDesc: string;
  destinationFundId: number;
  modificationDate: string;
  ratesProductParametrizationList: RatesProductParametrizationList[];
  status: boolean;
}

interface RatesProductParametrizationList {
  alternative: boolean;
  creationDate: string;
  id: number;
  indexerCode: string;
  maxDaysDocumentsWait: number;
  maxDaysProposalApproval: number;
  modificationDate: string;
  rateProductDefinitionCode: string;
  rateProductDefinitionDescription: string;
  rateProductDerivationCode: string;
  rateType: string;
  status: boolean;
  validityEndDate: string;
  validityInitDate: string;
}

interface AlternativeFund {
  activityStatusFlag: string;
  actualizedDate: string;
  alternativeFundId: number;
  createdDate: string;
}
