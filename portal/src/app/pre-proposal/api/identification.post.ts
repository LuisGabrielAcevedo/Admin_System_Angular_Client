export interface CustomerIdentificationPOST {
  afipActivity?: {
    id: number;
  };
  afipActivityInitDate: string;
  birthDate: string; // ddmmyyyy
  cuitl: string; // integer
  document: string; //integer
  documentType: {
    id: number;
  };
  firstName: string;
  gender: {
    id: string;
  };
  income: number;
  isMarriedWithCoOwner: boolean;
  lastName: string;
  owner: boolean; // always true?
  phone: string;
}

export interface IdentificationPOST {
  identificationDTO: {
    customer: CustomerIdentificationPOST;
    coOwner: CustomerIdentificationPOST;
    uuid: string; // necessary?
    store: {
      id: number;
      integrationCode: string;
      name: string;
    };
    vehicle: {
      adapted?: boolean; // [NOT ON SCREEN] false;
      brand?: {
        id: number;
      };
      fuelYear: {
        id: number;
        year: number;
        zeroKm: boolean;
      };
      model?: {
        id: number;
      };
      purchaseValue: number;
      taxi: boolean;
      used: boolean;
      vehicleType: {
        id: number;
      };
    };
  };
}

export const IdentificationPOSTFactory = (
  param: any = {}
): IdentificationPOST => {
  const newIdentificationPOST = {
    identificationDTO: {
      customer: {
        afipActivity: {
          id: ''
        },
        afipActivityInitDate: '',
        birthDate: '', // ddmmyyyy
        cuitl: '', // integer
        document: '', //integer
        documentType: {
          id: ''
        },
        firstName: '',
        gender: {
          id: ''
        },
        income: '',
        isMarriedWithCoOwner: false,
        lastName: '',
        owner: true, // always true?
        phone: ''
      },
      coOwner: {
        afipActivity: {
          id: ''
        },
        afipActivityInitDate: '',
        birthDate: '', // ddmmyyyy
        cuitl: '', // integer
        document: '', //integer
        documentType: {
          id: ''
        },
        firstName: '',
        gender: {
          id: ''
        },
        income: '',
        isMarriedWithCoOwner: false,
        lastName: '',
        owner: false, // always true?
        phone: ''
      },
      uuid: '', // necessary?
      vehicle: {
        adapted: null, // [NOT ON SCREEN] false;
        brand: {
          id: ''
        },
        fuelYear: {
          id: null,
          year: null,
          zeroKm: null
        },
        model: {
          id: ''
        },
        purchaseValue: null,
        taxi: null,
        used: null,
        vehicleType: {
          id: null
        }
      },
      store: {
        id: null,
        integrationCode: '',
        name: ''
      }
    }
  };

  const result = { ...newIdentificationPOST, ...param } as IdentificationPOST;

  return result;
};
