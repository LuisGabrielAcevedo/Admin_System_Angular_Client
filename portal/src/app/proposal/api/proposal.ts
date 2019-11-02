import { CommentsList } from '../data-register/api/proposalDTO';
export interface DocumentType {
  id: number;
  description: string;
  integrationCode?: any;
}

export interface Occupation {
  id: number;
  description: string;
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
  personType: 'OWNER_SPOUSE' | 'CO_OWNER_SPOUSE';
}

export interface Gender {
  id: string;
  description: string;
  integrationCode?: any;
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
  id: string;
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

export interface AfipActivity {
  id: number;
  afipCode: number; // afipCode para ale
  description: string;
}

export interface Pep {
  isPep: boolean;
  type: string;
  reason: string;
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
  pep: Pep;
  address: Address;
  addressDni: Address;
  cellPhone: Cellphone;
  email: string;
  occupation: Occupation;
  role: Role;
  profession: Profession;
  educationLevel: EducationLevel;
  enterpriseType: EnterpriseType;
  economicSector: EconomicSector;
  nup: number;
  personType: 'OWNER' | 'CO_OWNER';
  worksInDependencyRelationship?: boolean;
  id: number;
}

export interface EnterpriseType {
  id: number;
  description: string;
}

export interface EconomicSector {
  id: number;
  description: string;
}

export interface Role {
  id: number;
  description: string;
}

export interface Profession {
  id: number;
  description: string;
}

export interface EducationLevel {
  id: number;
  description: string;
}

export interface Cellphone {
  number: number;
  areaCode: string;
  provider: MobileProvider;
}

export interface Address {
  street: string;
  number: number;
  floor: string;
  apartment: string;
  postalCode: string;
  state: {
    id: string;
    description: string;
  };
  locality: {
    id: number;
    description: string;
  };
}

export interface Rate {
  axisCode: string;
  axisEnd: number;
  axisStart: number;
  axisTypeCode: string;
  creationDate: string;
  descriptionAxis: string;
  indexerCode: string;
  installments: number[];
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

export interface RatesProductViewDTOList {
  indexerType: string;
  matrixCode: string;
  rates: Rate[];
}

export interface Reason {
  description: string;
  group: string;
  reason: string;
}

export interface Comment {
  date: string;
  comment: string;
}

export interface Status {
  id: number;
  proposalStatusCode: string; // "R"
  proposalStatusDescription: string; // "REGISTRO DE DATOS"
  proposalStatusGroup: {
    id: number;
    description: string; //"PENDIENTE"
    organizationId: number;
  };
  organizationId: number;
  priorityNumber: number;
}

export interface RiskEvaluationResultDTO {
  enableImprovement: string;
  finalAlternativeAmount: number;
  finalAlternativeAmountUVA: number;
  finalAmount: number;
  finalAmountUVA: number;
  finalInstallment: number;
  finalInstallmentUVA: number;
  finalInstallmentValue: number;
  finalInstallmentValueUVA: number;
  ltv: number;
  ltvUVA: number;
  maxVehicleAmount: number;
  maxVehicleAmountUVA: number;
  minAmount: number;
  minAmountUVA: number;
  minInstallment: number;
  minInstallmentUVA: number;
  reasons: Reason[];
  repairable: string;
  statusCode: string;
}

export interface CalculatedValueDTO {
  infoAutoValue: number;
  tea: number;
  cftea: number;
  initialPayment: number; //valor de la primera cueta
  financedAmount: number;
  pureEstimatedInstallmentValue: number; // Cuota Pura Estimada
  pureEstimatedInstallmentValueWithIva: number; //Cuota Pura Estimada con IVA
  pureEstimatedInstallmentValueInUVA: number; // Cuota Pura en UVAs (solo si es UVA
  capitalInUVAs: number; //Capital en UVAs (solo en UVA
  indexerValue: number; //valor de la UVA del dia (solo UVA
  terms: number; //Cantidad de Cuotas
  capitalWithInterests: number; //Capital + Intereses
  dueDate: number; //Día de vencimiento Cuota Mensual
}

export interface RiskEvaluation {
  output: string;
  riskEvaluationResultDTO: RiskEvaluationResultDTO;
  solicitudeNumber: number;
  success: boolean;
}

export interface Scoring {
  calculatedValueDTO: CalculatedValueDTO;
  ratesProductViewDTOList: RatesProductViewDTOList[];
  riskEvaluation: RiskEvaluation;
}

export interface Store {
  id: number;
  name: string;
  branchCode: number; // codigo de sucursal
  sellingPointCode: number;
  strategyCode: string;
  integrationCode: string;
}

export interface Brand {
  description: string;
  id: number;
}

export interface BrandAndModel {
  description: string;
  id: number;
  models: Model[];
  disabled?: boolean;
}

export interface FuelYear {
  id: number;
  year: number;
  zeroKm: boolean;
}

export interface Model {
  description: string;
  id: number;
  enable?: boolean;
  disabled?: boolean;
}

export interface VehicleType {
  description: string;
  filter: string;
  id: number;
}

export interface UseType {
  id: number;
  description: string;
  code: string;
}

export interface Vehicle {
  brand: Brand;
  model: Model;
  useType: UseType;
  vehicleType: VehicleType;
  fuelYear: FuelYear;
  purchaseValue: number;
  chassisNumber: string;
  chassisBrand: string;
  engineNumber: string;
  engineBrand: string;
  gnc: string;
  domainNumber: string;
  commercialVehicle: boolean;
  hasFleetInsurance: boolean;
}

export interface Insurance {
  insuranceCompanyDescription: string; //name
  coverageType: string;
  installments: number;
  installmentAmount: number;
  quotationNumber: number;
  planCode: string;
  totalPrize: number;
  nextPayment: number; //valor de la siguiente cuota
  insuranceBranch: number;
  productCode: string;
  fullDescription: string;
}

export interface Account {
  accountDTO?: {
    accountNumber?: number;
    isNewAccount?: boolean;
  };
  sellingPointDTO?: {
    id?: number;
  };
  conciergeDTO?: {
    id?: number;
    name?: string;
  };
}

export interface Phases {
  phasesCode: string;
}

export interface ProposalDTO {
  proposalNumber: number;
  owner: Customer;
  coOwner?: Customer;
  vehicle: Vehicle;
  store: Store;
  scoring?: Scoring;
  account?: Account;
  insurance?: Insurance;
  commentsList: CommentsList[];
  status?: Status;
  phases?: Phases;
  pledgeType: string;
}

export const CustomerFactory = (param: any = {}): Customer => {
  const newCustomer = {
    afipActivity: {
      id: null,
      integrationCode: null, // afipCode para ale
      description: ''
    },
    afipActivityInitDate: '',
    birthDate: '',
    cuitl: '',
    workDocumentType: {
      id: null,
      description: ''
    },
    document: '',
    documentType: {
      id: null,
      description: ''
    },
    firstName: '',
    gender: {
      id: null,
      description: ''
    },
    income: null,
    isMarriedWithCoOwner: null,
    nonParticipantSpouse: {
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
    },
    lastName: '',
    owner: null,
    countryOfBirth: {
      id: null,
      description: ''
    },
    nationality: {
      id: null,
      description: ''
    },
    maritalStatus: {
      id: null,
      description: ''
    },
    ivaCategory: {
      id: null,
      description: ''
    },
    iibbCategory: {
      id: null,
      description: ''
    },
    address: {
      street: null,
      number: null,
      floor: null,
      apartment: null,
      postalCode: null,
      state: {
        // meter en address, para santi
        id: null,
        description: ''
      },
      locality: {
        id: null,
        description: ''
      }
    },
    cellphone: {
      number: '',
      areaCode: '',
      provider: ''
    },
    email: '',
    occupation: {
      id: null,
      description: ''
    },
    role: {
      id: null,
      description: ''
    },
    profession: {
      id: null,
      description: ''
    },
    educationLevel: {
      id: null,
      description: ''
    },
    enterpriseType: {
      id: null,
      description: ''
    },
    economicSector: {
      id: null,
      description: ''
    },
    nup: null
  };

  const result = {
    ...newCustomer,
    ...param
  } as Customer;

  return result;
};

export const ProposalDTOFactory = (param: any = {}): ProposalDTO => {
  const newProposal = {
    proposalNumber: null,
    owner: CustomerFactory(),
    coOwner: CustomerFactory(),
    vehicle: {
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
        id: null, // si el id es nulo, significa que zeroKM y año fueron escritos manualmente.
        zeroKm: undefined,
        year: undefined
      },
      purchaseValue: undefined,
      chassisNumber: '',
      engineNumber: '',
      gnc: undefined, // es "A" o "N"
      domainNumber: undefined,
      isCommercialVehicle: undefined,
      hasFleetInsurance: undefined
    },
    store: {
      id: null,
      integrationCode: undefined,
      name: undefined
    },
    pledgeType: '',
    scoring: {
      calculatedValue: {
        infoAutoValue: undefined,
        tea: undefined,
        cftea: undefined,
        initialPayment: undefined, //valor de la primera cueta
        financedAmount: undefined,
        pureEstimatedInstallmentValue: undefined, // Cuota Pura Estimada
        pureEstimatedInstallmentValueWithIva: undefined, //Cuota Pura Estimada con IVA
        pureEstimatedInstallmentValueInUVA: undefined, // Cuota Pura en UVAs (solo si es UVA
        capitalInUVAs: undefined, //Capital en UVAs (solo en UVA
        indexerValue: undefined, //valor de la UVA del dia (solo UVA
        terms: undefined, //Cantidad de Cuotas
        capitalWithInterests: undefined, //Capital + Intereses
        dueDate: undefined //Día de vencimiento Cuota Mensual
      },
      ratesProductViewDTOList: [
        {
          indexerType: '', //tipo de tasa
          matrixCode: '',
          rates: [
            {
              axisCode: '',
              axisEnd: undefined,
              axisStart: undefined,
              axisTypeCode: '',
              descriptionAxis: '',
              indexerCode: '',
              installments: undefined,
              longDescriptionMatrix: '',
              matrixCode: '',
              percentageRate: undefined, // TNA (Tasa Nominal Anual
              rateId: undefined,
              rateType: '',
              shortDescriptionMatrix: '',
              status: undefined
            }
          ]
        }
      ],
      riskEvaluation: {
        output: '',
        riskEvaluationResultDTO: {
          enableImprovement: '',
          finalAlternativeAmount: undefined,
          finalAlternativeAmountUVA: undefined,
          finalAmount: undefined, //monto maximo a financiar
          finalInstallment: undefined,
          finalInstallmentValue: undefined,
          ltv: undefined,
          maxVehicleAmount: undefined,
          minAmount: undefined,
          minAmountUVA: undefined,
          minInstallment: undefined,
          reasons: [
            {
              description: '',
              group: '',
              reason: ''
            }
          ],
          repairable: '',
          statusCode: ''
        },
        solicitudeNumber: undefined,
        success: undefined
      }
    },
    account: {
      accountNumber: undefined,
      sellingPointId: undefined,
      conciergeId: undefined,
      newAccount: undefined
    },
    insurance: {
      insuranceCompanyDescription: '', //name
      coverageType: '',
      installments: undefined,
      installmentAmount: undefined,
      quotationNumber: undefined,
      planCode: undefined,
      totalPrize: undefined, // premio
      nextPayment: undefined, //valor de la siguiente cuota
      insuranceBranch: undefined,
      productCode: undefined,
      fullDescription: ''
    },
    commentsList: [],
    status: {
      id: null,
      proposalStatusCode: '',
      proposalStatusDescription: '',
      proposalStatusGroup: {
        id: null,
        description: '',
        organizationId: null
      },
      organizationId: null,
      priorityNumber: null
    }
  };

  const result = {
    ...newProposal,
    ...param
  } as ProposalDTO;

  return result;
};
