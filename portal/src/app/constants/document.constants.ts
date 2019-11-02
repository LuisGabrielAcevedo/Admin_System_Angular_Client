export const DOCUMENT_TYPE = {
  PERSONAL: {
    ID: 'P',
    TYPE: {
      DNI: 150, // Needs to change to an agreed code with backend of letters
      DNI_E: 151 // Needs to change to an agreed code with backend of letters
    }
  },
  WORK: {
    ID: 'L',
    TYPE: {
      CUIT: 152, // Needs to change to an agreed code with backend of letters
      CUIL: 153 // Needs to change to an agreed code with backend of letters
    }
  }
};

export const TAX_CATEGORY = {
  IVA: 'IV',
  IIBB: 'IB'
};

export const DEPENDENCY_RELATIONSHIP = 11; // Needs to change to an agreed code with backend of letters

export enum eOccupation {
  DEPENDENCY_RELATIONSHIP = 'RDEP',
  UNEMPLOYED = 'NTRA',
  SELF_EMPLOYED = 'CPRO'
}

export const FINAL_CONSUMER = 'CONSUMIDOR FINAL'; // Needs to change?

export const ARGENTINA = 'ARGENTINA'; // Needs to change?

export const EXEMPT_IVA = 'RESPONSABLE EXENTO';

export const EXEMPT_IIBB = 'EXENTO';

export const PLEDGES = {
  PRE_PLEDGE: 'P',
  INSCRIBED_PLEDGE: 'I'
};
