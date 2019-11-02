import { PersonalDataForm } from './personal-data-form.model';
import { ContactDataForm } from './contact-data-form.model';
import { ProfessionalDataForm } from './professional-data-form.model';

export interface CustomerPatch {
  address: {
    address: {
      number: number;
      apartment: string;
      floor: string;
      locality: {
        description: string;
        id: number;
      };
      postalCode: string;
      state: {
        description: string;
        id: string;
      };
      street: string;
    };
    afipActivity: {
      description: string;
      id: number;
      integrationCode: string;
    };
    afipActivityInitDate: string;
    birthDate: string;
    cellPhone: {
      areaCode: string;
      number: string;
      provider: {
        description: string;
        id: number;
      };
    };
    countryOfBirth: {
      description: string;
      id: string;
    };
    cuitl: string;
    document: string;
    documentType: {
      description: string;
      id: number;
      integrationCode: string;
    };
    email: string;
    firstName: string;
    gender: {
      description: string;
      id: string;
      integrationCode: string;
    };
    iibbCategory: {
      description: string;
      id: number;
    };
    income: number;
    isMarriedWithCoOwner: boolean;
    ivaCategory: {
      description: string;
      id: number;
    };
    lastName: string;
    maritalStatus: {
      description: string;
      id: string;
    };
    markPerson: string;
    marriedWithCoOwner: boolean;
    nationality: {
      description: string;
      id: string;
    };
    nup: number;
    owner: boolean;
    workDocumentType: {
      description: string;
      id: number;
      integrationCode: string;
    };
  };
}

export interface ChildComponentOutput {
  value: PersonalDataForm | ContactDataForm | ProfessionalDataForm;
  valid: boolean;
  type: 'personal' | 'contact' | 'professional';
}

export interface CustomerPatchRes {
  status: string; // APR - APPROVED | REC - REJECTED
  reason: string;
}
