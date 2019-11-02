import { Spouse, SpouseFactory } from './spouse';
import { Country } from './country';
import { MaritalStatus } from './maritalStatus';
import { TaxCategory } from './taxCategory';
import { State } from './state';
import { Locality } from './locality';
import { MobileProvider } from './mobileProvider';
import { Occupation } from './occupation';
import { Role } from './role';
import { Profession } from './profession';
import { EducationLevel } from './educationLevel';
import { EnterpriseType } from './enterpriseType';
import { EconomicSector } from './economicSector';
import { Email } from './email';
import { Model } from '@app/pre-proposal/api/model';
import { AfipActivity } from '@app/pre-proposal/api/afipActivity';
import { Gender } from '@app/pre-proposal/api/gender';
import { Brand } from '@app/pre-proposal/api/brand';
import { FuelYear } from '@app/pre-proposal/api/fuelYear';
import { DocumentType } from '@app/proposal/api/proposal';

export interface CustomerPatch {
  afipActivity?: AfipActivity;
  afipActivityInitDate: string;
  birthDate: string;
  cuitl: string;
  workDocumentType: DocumentType;
  document: string;
  documentType: DocumentType;
  firstName: string;
  gender: Gender;
  income: number;
  isMarriedWithCoOwner: boolean;
  nonParticipantSpouse: Spouse;
  lastName: string;
  owner: boolean;
  countryOfBirth: Country;
  nationality: Country;
  maritalStatus: MaritalStatus;
  ivaCategory: TaxCategory;
  iibbCategory: TaxCategory;
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

export interface VehiclePatch {
  adapted: boolean;
  brand: Brand;
  model: Model;
  vehicleType: {
    id: number;
    description: string;
    filter: string;
  };
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

export interface ProposalPatch {
  proposalNumber: number;
  financedAmount: number;
  terms: number;
  installmentValue: number;
  productCode: string;
  owner: CustomerPatch;
  coOwner: CustomerPatch;
  vehicle: VehiclePatch;
  store: {
    id: number;
    name: string;
    integrationCode: number;
  };
  scoring: {
    ratesProductViewDTOList: [
      {
        indexerType: string;
        matrixCode: string;
        rates: [
          {
            axisCode: string;
            axisEnd: number;
            axisStart: number;
            axisTypeCode: string;
            creationDate: string;
            descriptionAxis: string;
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
        ];
      }
    ];
    riskEvaluation: {
      output: string;
      riskEvaluationResultDTO: {
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
        reasons: [
          {
            description: string;
            group: string;
            reason: string;
          }
        ];
        repairable: string;
        statusCode: string;
      };
      solicitudeNumber: number;
      success: boolean;
    };
  };
}

export const CustomerPatchFactory = (param: any = {}): CustomerPatch => {
  const newCustomerPatch = {
    afipActivity: {
      id: null,
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
    nonParticipantSpouse: SpouseFactory(),
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
    state: {
      id: null,
      description: ''
    },
    locality: {
      id: null,
      description: ''
    },
    address: {
      street: '',
      number: null,
      floor: '',
      apartment: '',
      postalCode: ''
    },
    cellphone: {
      id: null,
      number: '',
      areaCode: '',
      provider: {
        id: null,
        description: ''
      },
      email: {
        id: null,
        description: ''
      },
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
      }
    }
  };

  const result = { ...newCustomerPatch, ...param } as CustomerPatch;

  return result;
};

export const VehiclePatchFactory = (param: any = {}): VehiclePatch => {
  const newVehiclePatch = {
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
      id: '',
      year: null,
      zeroKm: null
    },
    purchaseValue: null,
    used: null,
    chassisNumber: '',
    engineNumber: '',
    gnc: null,
    domainNumber: '',
    isPeopleTransport: null,
    hasFleetInsurance: null
  };

  const result = { ...newVehiclePatch, ...param } as VehiclePatch;

  return result;
};

export const ProposalPatchFactory = (param: any = {}): ProposalPatch => {
  const newProposalPatch = {
    proposalId: null,
    financedAmount: null,
    terms: null,
    installmentValue: null,
    productCode: '',
    owner: CustomerPatchFactory(),
    coOwner: CustomerPatchFactory(),
    store: {
      integrationCode: null,
      name: null
    },
    uuid: null,
    vehicle: VehiclePatchFactory()
  };

  const result = { ...newProposalPatch, ...param } as ProposalPatch;

  return result;
};
