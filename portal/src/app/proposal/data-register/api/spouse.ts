import { Country } from './country';
import { Gender } from '@app/pre-proposal/api/gender';

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
