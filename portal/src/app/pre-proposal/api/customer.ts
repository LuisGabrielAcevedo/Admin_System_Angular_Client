import { Gender } from './gender';
import { AfipActivity } from './afipActivity';
import { DocumentType } from './documentType';
import { Spouse, SpouseFactory } from '../../proposal/data-register/api/spouse';
import { Country } from '../../proposal/data-register/api/country';
import { MaritalStatus } from '../../proposal/data-register/api/maritalStatus';
import { TaxCategory } from '../../proposal/data-register/api/taxCategory';
import { State } from '../../proposal/data-register/api/state';
import { Locality } from '../../proposal/data-register/api/locality';
import { MobileProvider } from '../../proposal/data-register/api/mobileProvider';
import { Occupation } from '../../proposal/data-register/api/occupation';
import { Role } from '../../proposal/data-register/api/role';
import { Profession } from '../../proposal/data-register/api/profession';
import { EducationLevel } from '../../proposal/data-register/api/educationLevel';
import { EnterpriseType } from '../../proposal/data-register/api/enterpriseType';
import { EconomicSector } from '../../proposal/data-register/api/economicSector';

export interface Customer {
  afipActivity: AfipActivity;
  afipActivityAntiquity: string;
  birthDate: string; // DDMMAAAA
  document: string;
  documentType: DocumentType;
  cuitl: string;
  workDocumentType: DocumentType;
  nonParticipantSpouse: Spouse; // No Participants
  firstName: string;
  gender: Gender;
  income: number; // salary
  lastName: string;
  married: boolean;
  owner: boolean;
  countryOfBirth: Country;
  nationality: Country;
  maritalStatus: MaritalStatus;
  ivaCategory: TaxCategory;
  iibbCategory: TaxCategory;
  state: State;
  locality: Locality;
  street: string;
  addressNumber: number;
  floor: string;
  apartment: string;
  postalCode: string;
  areaCode: number;
  mobileNumber: number;
  mobileProvider: MobileProvider;
  email: string;
  occupation: Occupation;
  role: Role; // FUNCIÓN
  profession: Profession;
  educationLevel: EducationLevel;
  enterpriseType: EnterpriseType;
  economicSector: EconomicSector;
}

export const CustomerFactory = (param: any = {}): Customer => {
  const newCustomer = {
    afipActivity: {
      id: null
    },
    afipActivityAntiquity: null,
    birthDate: null, // DDMMAAAA
    cuitl: null,
    document: null,
    documentType: {
      id: null,
      description: null
    },
    spouse: SpouseFactory(), // No Participants
    firstName: null,
    gender: {
      id: null,
      description: null
    },
    income: null, // salary
    lastName: null,
    married: null,
    owner: null
  };

  const result = { ...newCustomer, ...param } as Customer;

  return result;
};
