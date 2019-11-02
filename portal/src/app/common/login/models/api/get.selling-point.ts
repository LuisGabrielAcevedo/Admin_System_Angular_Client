export interface SellingPointFeaturesDTO {
  carEnabled?: boolean;
  sellingPointActive?: boolean;
  utilitarianEnabled?: boolean;
  withoutInsuranceEnabled?: boolean;
}

export interface SellingPointConciergeDTO {
  city: string;
  idConcierges: number;
  name: string;
}

export interface GetSellingPointResponseDTO {
  agentCode: string;
  branchCode: string;
  city: string;
  continueWithoutInsurance: string;
  idSellingPoint: number;
  integrationCode: string;
  name: string;
  sellingPointCode: string;
  strategyCode: string;
  concierges: SellingPointConciergeDTO[];
  features: SellingPointFeaturesDTO;
}

/*

{
    "agentCode": "string",
    "branchCode": "string",
    "city": "string",
    "concierges": [
      {
        "city": "string",
        "idConcierges": 0,
        "modelSellingPoint": [
          {}
        ],
        "name": "string"
      }
    ],
    "continueWithoutInsurance": "string",
    "features": {
      "carEnabled": true,
      "sellingPointActive": true,
      "utilitarianEnabled": true,
      "withoutInsuranceEnabled": true
    },
    "idSellingPoint": 0,
    "integrationCode": "string",
    "name": "string",
    "sellingPointCode": "string",
    "strategyCode": "string"
  }
  */
