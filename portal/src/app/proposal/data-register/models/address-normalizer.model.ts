export interface NormalizerRequest {
  address: {
    apartment: string;
    floor: string;
    locality: {
      description: string;
      id: number;
    };
    number: number;
    postalCode: string;
    state: {
      description: string;
      id: string;
      insuranceIntegrationCode: string;
    };
    street: string;
  };
}

export interface NormalizerResponse {
  resultCode: string; // APR = Approved | ERR = Error | REV = Review
  reasonCode: string; // NP – NO – CO – DU - OK  (No se toma en cuenta para el MVP)

  streetName: string;
  number: number;
  stateCode: string;
  localityDesc: string;

  cpa: string;
  cp4: string;
  floor: string;
  apartment: string;

  listOfDoubts: Doubt[];
}

export interface Doubt {
  sequence: string;
  stateCode: string;
  localityDesc: string;
  streetName: string;
  numberMin: number;
  numberMax: number;
  cp4: string;
  cpa: string;
}

export interface SelectedAddress {
  number: string;
  street: Doubt;
}
