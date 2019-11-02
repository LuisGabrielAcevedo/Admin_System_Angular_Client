export interface OnBoardingCustomer {
  birthDate: string;
  cuitl: string;
  document: string;
  documentType: {
    id: number;
  };
  firstName: string;
  gender: {
    id: string;
  };
  income: number;
  isMarriedWithCoOwner: boolean;
  worksInDependencyRelationship?: boolean;
  lastName: string;
  owner: boolean;
  phone: string;
}

export interface OnBoardingVehicle {
  brand?: {
    id: number;
  };
  fuelYear: {
    year: number;
    zeroKm: boolean;
  };
  model?: {
    id: number;
  };
  purchaseValue: number;
  taxi: boolean;
  used?: boolean;
  adapted: boolean;
  vehicleType: {
    id: number;
  };
}

export interface OnBoardingStore {
  id: number;
  integrationCode: string;
  name: string;
}

export const OnBoardingStoreFactory = (param: any = {}): OnBoardingStore => {
  const newStore = {
    integrationCode: '504',
    id: 504,
    name: ''
  };

  const result = { ...newStore, ...param } as OnBoardingStore;

  return result;
};

export interface OnBoarding {
  identificationDTO: {
    customer: OnBoardingCustomer;
    coOwner: OnBoardingCustomer;
    uuid: string;
    store: OnBoardingStore;
    vehicle: OnBoardingVehicle;
  };
}

export interface OnBoardingResponse {
  reason: string;
  riskEngineStatus: string;
  uuid: string;
}
