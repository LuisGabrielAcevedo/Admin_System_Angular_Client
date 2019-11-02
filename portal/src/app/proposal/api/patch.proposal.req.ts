import {
  AfipActivity,
  Gender,
  Store,
  Brand,
  Model,
  FuelYear,
  VehicleType
} from './proposal';

export interface DocumentType {
  id: number;
  description: string;
}

export interface Country {
  id: string;
  description: string;
}

export interface MaritalStatus {
  id: string;
  description: string;
}

export interface TaxCategory {
  id: string | number;
  description: string;
}

export interface State {
  id: string;
  description: string;
}

export interface Locality {
  id: string;
  description: string;
}

export interface MobileProvider {
  id: string;
  description: string;
}

export interface Email {
  id: string;
  description: string;
}

export interface Occupation {
  id: number;
  description: string;
  integrationCode: string;
}

export interface Role {
  id: number;
  description: string;
}

export interface Profession {
  id: number;
  description: string;
  educationLevels?: Array<EducationLevel>;
}

export interface EducationLevel {
  id: number;
  description: string;
}

export interface EnterpriseType {
  id: number;
  description: string;
}

export interface EconomicSector {
  id: number;
  description: string;
}

export interface Month {
  id: string;
  description: string;
}

export interface Spouse {
  birthDate: string; // DDMMAAAA
  cuitl: string;
  document: string;
  documentType: DocumentType;
  workDocumentType: DocumentType;
  firstName: string;
  gender: Gender;
  lastName: string;
  countryOfBirth: Country;
  nationality: Country;
  personType: 'OWNER_SPOUSE' | 'CO_OWNER_SPOUSE';
}

export interface Customer {
  afipActivity: AfipActivity;
  afipActivityInitDate?: string;
  birthDate: string;
  cuitl: string;
  workDocumentType: DocumentType;
  document: string;
  documentType: DocumentType;
  firstName: string;
  gender: Gender;
  income: number;
  isMarriedWithCoOwner: boolean;
  nonParticipantSpouse?: Spouse;
  lastName: string;
  owner: boolean;
  countryOfBirth: Country;
  nationality: Country;
  maritalStatus: MaritalStatus;
  ivaCategory?: TaxCategory;
  iibbCategory?: TaxCategory;
  state: State;
  locality: Locality;
  address: {
    street: string;
    number: number;
    floor: string;
    apartment: string;
    postalCode: string;
  };
  cellphone: {
    id: number;
    number: string;
    areaCode: string;
    provider: MobileProvider;
  };
  email: Email;
  occupation: Occupation;
  role: Role;
  profession: Profession;
  educationLevel: EducationLevel;
  enterpriseType: EnterpriseType;
  economicSector: EconomicSector;
}

export interface Vehicle {
  adapted: boolean;
  brand: Brand;
  model: Model;
  vehicleType: VehicleType;
  fuelYear: FuelYear;
  purchaseValue: number;
  used: boolean;

  chassisNumber: string;
  engineNumber: string;
  gnc: boolean;
  domainNumber: string;
  regulatorNumber: string;
  canisterNumber: string;
  cylinderNumber: string;
  assemblyWorkshop: string;
  regulatorBrand: string;
  serialNumber: string;
  dateFrom: string;
  dateTo: string;
  isCommercialVehicle: boolean;
  hasFleetInsurance: boolean;
}

export interface PatchProposalDTO {
  proposalNumber: number;
  owner: Customer;
  coOwner: Customer;
  vehicle: Vehicle;
  store: Store;
  scoring: any;
  account: Account;
}

export interface Account {
  accountDTO: {
    accountNumber?: number;
    isNewAccount: boolean;
  };
  sellingPointDTO: {
    id?: number;
  };
  conciergeDTO: {
    id?: number;
  };
}

export const CustomerFactory = (param: any = {}): Customer => {
  const newCustomer = {
    afipActivity: {
      id: null,
      description: null
    },
    afipActivityInitDate: null,
    birthDate: null,
    cuitl: null,
    workDocumentType: {
      id: null,
      description: null
    },
    document: null,
    documentType: {
      id: null,
      description: null
    },
    firstName: null,
    gender: {
      id: null,
      description: null
    },
    income: null,
    isMarriedWithCoOwner: null,
    nonParticipantSpouse: SpouseFactory(),
    lastName: null,
    owner: null,
    countryOfBirth: {
      id: null,
      description: null
    },
    nationality: {
      id: null,
      description: null
    },
    maritalStatus: {
      id: null,
      description: null
    },
    ivaCategory: {
      id: null,
      description: null
    },
    iibbCategory: {
      id: null,
      description: null
    },
    address: {
      street: null,
      number: null,
      floor: null,
      apartment: null,
      postalCode: null,
      state: {
        id: null,
        description: null
      },
      locality: {
        id: null,
        description: null
      }
    },
    cellphone: {
      number: null,
      areaCode: null,
      provider: null
    },
    email: null,
    occupation: {
      id: null,
      description: null
    },
    role: {
      id: null,
      description: null
    },
    profession: {
      id: null,
      description: null
    },
    educationLevel: {
      id: null,
      description: null
    },
    enterpriseType: {
      id: null,
      description: null
    },
    economicSector: {
      id: null,
      description: null
    },
    // Datos hardcodeados
    workCellphone: {
      number: '0000-0005',
      areaCode: '(011)'
    },
    employmentSeniority: '000',
    company: ' ',
    otherIncomes: '0000000000',
    otherIncomesDetail: '000',
    lastDegreeObtained: ' '
  };

  const result = {
    ...newCustomer,
    ...param
  } as Customer;

  return result;
};

export const SpouseFactory = (param: any = {}): Spouse => {
  const newSpouse = {
    birthDate: null,
    cuitl: null,
    document: null,
    documentType: {
      id: null,
      description: null
    },

    workDocumentType: {
      id: null,
      description: null
    },
    firstName: null,
    gender: {
      id: null,
      description: null
    },
    lastName: null,
    countryOfBirth: {
      id: null,
      description: null
    },
    nationality: {
      id: null,
      description: null
    }
  };

  const result = { ...newSpouse, ...param } as Spouse;

  return result;
};

export const VehicleFactory = (param: any = {}): Vehicle => {
  const newVehicle = {
    adapted: null,
    brand: {
      id: null,
      description: ''
    },
    model: {
      id: null,
      description: ''
    },
    vehicleType: {
      id: null,
      description: '',
      filter: ''
    },
    fuelYear: {
      id: null,
      description: '',
      zeroKm: null,
      year: null
    },
    purchaseValue: null,
    used: false,
    chassisNumber: '',
    engineNumber: '',
    gnc: null,
    domainNumber: '',
    isCommercialVehicle: null,
    hasFleetInsurance: null
  };

  const result = { ...newVehicle, ...param } as Vehicle;

  return result;
};

export const PatchProposalDTOFactory = (param: any = {}): PatchProposalDTO => {
  const newProposal = {
    proposalId: null,
    owner: CustomerFactory(),
    coOwner: CustomerFactory(),
    store: {
      integrationCode: null,
      name: null
    },
    uuid: null,
    vehicle: VehicleFactory()
  };

  const result = {
    ...newProposal,
    ...param
  } as PatchProposalDTO;

  return result;
};

export const PatchPartialProposalFactory = (
  param: any = {}
): PatchProposalDTO => {
  const newPartialProposal = {
    proposalNumber: null,
    owner: null,
    coOwner: null,
    vehicle: null,
    store: null,
    scoring: null,
    accountAssociation: null
  };

  const result = {
    ...newPartialProposal,
    ...param
  } as PatchProposalDTO;

  return result;
};
