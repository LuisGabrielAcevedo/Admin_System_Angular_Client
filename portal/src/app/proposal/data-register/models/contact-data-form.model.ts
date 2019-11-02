import { MobileProvider } from '@app/proposal/api/patch.proposal.req';

export interface ContactDataForm {
  address: Address;
  cellPhone: {
    areaCode: string;
    number: number;
    provider: MobileProvider;
  };
  email: string;
}

export interface Address {
  state: {
    id: string;
    description: string;
  };
  locality: {
    id: number;
    description: string;
  };
  street: string;
  number: number;
  floor: string;
  apartment: string;
  postalCode: string;
}

export const ContactDataFormFactory = (param: any = {}): ContactDataForm => {
  const newContactDataForm: ContactDataForm = {
    address: {
      state: {
        id: null,
        description: null
      },
      locality: {
        id: null,
        description: null
      },
      street: null,
      number: null,
      floor: null,
      apartment: null,
      postalCode: null
    },
    cellPhone: {
      areaCode: null,
      number: null,
      provider: {
        id: null,
        description: null
      }
    },
    email: null
  };
  const result = { ...newContactDataForm, ...param } as ContactDataForm;

  return result;
};
