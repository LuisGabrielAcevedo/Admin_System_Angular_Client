import {
  DocumentType,
  Country,
  MaritalStatus
} from '@app/proposal/api/patch.proposal.req';
import { Gender, TaxCategory } from '@app/proposal/api/proposal';

export interface PersonalDataForm {
  firstName: string;
  lastName: string;
  birthDate: string;
  personalDocumentType: DocumentType;
  personalDocumentNumber: string;
  gender: Gender;
  countryOfBirth: Country;
  nationality: Country;
  maritalStatus: MaritalStatus;
  workDocumentType: DocumentType;
  workDocumentNumber: string;
  ivaCategory: TaxCategory;
  iibbCategory: TaxCategory;
  isPep: boolean;
  pepType: string;
  pepReason: string;
  spouseData: SpouseDataForm;
}

export interface SpouseDataForm {
  firstName: string;
  lastName: string;
  birthDate: string;
  personalDocumentType: DocumentType;
  personalDocumentNumber: string;
  gender: Gender;
  workDocumentType: DocumentType;
  workDocumentNumber: string;
  countryOfBirth: Country;
  nationality: Country;
}

export const SpouseDataFormFactory = (param: any = {}): SpouseDataForm => {
  const newSpouseDataForm: SpouseDataForm = {
    firstName: null,
    lastName: null,
    birthDate: null,
    personalDocumentType: null,
    personalDocumentNumber: null,
    gender: null,
    workDocumentType: null,
    workDocumentNumber: null,
    countryOfBirth: null,
    nationality: null
  };
  const result = { ...newSpouseDataForm, ...param } as SpouseDataForm;

  return result;
};

export const PersonalDataFormFactory = (param: any = {}): PersonalDataForm => {
  const newPersonalDataForm: PersonalDataForm = {
    firstName: null,
    lastName: null,
    birthDate: null,
    personalDocumentType: {
      id: null,
      description: null
    },
    personalDocumentNumber: null,
    gender: {
      id: null,
      description: null
    },
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
    workDocumentType: {
      id: null,
      description: null
    },
    workDocumentNumber: null,
    ivaCategory: {
      id: null,
      description: null
    },
    iibbCategory: {
      id: null,
      description: null
    },
    isPep: null,
    pepType: null,
    pepReason: null,
    spouseData: SpouseDataFormFactory()
  };

  const result = { ...newPersonalDataForm, ...param } as PersonalDataForm;

  return result;
};
