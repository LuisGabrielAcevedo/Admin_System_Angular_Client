import {
  Country,
  Comment,
  Customer,
  Vehicle,
  CustomerFactory,
  Status,
  Account,
  Phases
} from './proposal';

export { Customer } from './proposal';

export interface Gender {
  id: string;
  description: string;
  integrationCode?: any;
}

export interface DocumentType {
  id: number;
  description: string;
  integrationCode: string;
}

export interface Owner {
  firstName: string;
  lastName: string;
  document: string;
  birthDate: string;
  phone?: any;
  cuitl: string;
  owner: boolean;
  isMarriedWithCoOwner: boolean;
  gender: Gender;
  documentType: DocumentType;
  afipActivity?: any;
  afipActivityInitDate?: any;
  income: number;
  nonParticipantSpouse?: any;
  marriedWithCoOwner: boolean;
  nup?: number;
}

export interface VehicleType {
  id: number;
  description: string;
  filter: string;
  inativo: boolean;
  organizationId: number;
}

export interface Brand {
  id: number;
  description: string;
  integrationCode: string;
  inactive: boolean;
  organizationId: number;
}

export interface Model {
  id: number;
  description: string;
  integrationCode: string;
  disabled: boolean;
  organizationId: number;
}
export interface Store {
  id: number;
  name: string;
  branchCode: number; // codigo de sucursal
  sellingPointCode: number;
  strategyCode: string;
  integrationCode: string;
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
}

export interface ProposalDTO {
  commentsList: any[];
  proposalNumber: number;
  owner: Customer;
  coOwner?: Customer;
  vehicle: Vehicle;
  store: Store;
  scoring?: any;
  account?: Account;
  insurance?: any;
  comments?: Comment[];
  status?: Status;
  pledgeType: string;
}

export const SpouseFactory = (param: any = {}): Spouse => {
  const newSpouse = {
    birthDate: '',
    cuitl: '',
    document: '',
    documentType: {
      id: null,
      description: ''
    },

    workDocumentType: {
      id: null,
      description: ''
    },
    firstName: '',
    gender: {
      id: null,
      description: ''
    },
    lastName: '',
    countryOfBirth: {
      id: null,
      description: ''
    },
    nationality: {
      id: null,
      description: ''
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
    used: null,
    chassisNumber: '',
    engineNumber: '',
    gnc: null,
    domainNumber: '',
    regulatorNumber: '',
    canisterNumber: '',
    cylinderNumber: '',
    assemblyWorkshop: '',
    regulatorBrand: '',
    serialNumber: '',
    dateFrom: '',
    dateTo: '',
    isCommercialVehicle: null,
    hasFleetInsurance: null
  };

  const result = { ...newVehicle, ...param } as Vehicle;

  return result;
};

export const PatchProposalDTOFactory = (param: any = {}): ProposalDTO => {
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
  } as ProposalDTO;

  return result;
};
