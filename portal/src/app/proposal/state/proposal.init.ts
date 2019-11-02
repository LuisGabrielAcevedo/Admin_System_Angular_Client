import { ProposalDTO } from '../api';
import { ProposalState } from './proposal.model';

const initProposal: ProposalDTO = {
  proposalNumber: 0,
  owner: {
    afipActivity: {
      id: null,
      afipCode: null, // afipCode para ale
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
      },
      personType: null
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
    pep: {
      isPep: null,
      type: '',
      reason: ''
    },
    address: {
      street: null,
      number: null,
      floor: null,
      apartment: null,
      postalCode: null,
      state: {
        id: null,
        description: ''
      },
      locality: {
        id: null,
        description: ''
      }
    },
    addressDni: {
      street: null,
      number: null,
      floor: null,
      apartment: null,
      postalCode: null,
      state: {
        id: null,
        description: ''
      },
      locality: {
        id: null,
        description: ''
      }
    },
    cellPhone: {
      number: null,
      areaCode: null,
      provider: {
        id: null,
        description: ''
      }
    },
    email: '',
    occupation: {
      id: null,
      description: '',
      integrationCode: ''
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
    nup: null,
    personType: null,
    id: null
  },
  coOwner: undefined,
  vehicle: {
    brand: {
      id: undefined,
      description: ''
    },
    model: {
      id: undefined,
      description: ''
    },
    useType: {
      id: undefined,
      description: '',
      code: ''
    },
    vehicleType: {
      id: undefined,
      description: '',
      filter: ''
    },
    fuelYear: {
      id: undefined, // si el id es nulo, significa que zeroKM y año fueron escritos manualmente.
      zeroKm: undefined,
      year: undefined
    },
    purchaseValue: undefined,
    chassisNumber: '',
    chassisBrand: '',
    engineNumber: '',
    engineBrand: '',
    gnc: '', // es "A" o "N"
    domainNumber: '',
    commercialVehicle: undefined,
    hasFleetInsurance: undefined
  },
  store: {
    id: null,
    name: '',
    branchCode: null, // codigo de sucursal
    sellingPointCode: null,
    strategyCode: '',
    integrationCode: ''
  },
  pledgeType: '',
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
  },
  scoring: undefined,
  comments: undefined,
  account: {
    accountDTO: {
      accountNumber: undefined,
      isNewAccount: undefined
    },
    sellingPointDTO: {
      id: undefined
    },
    conciergeDTO: {
      id: undefined,
      name: ''
    }
  },

  commentsList: []
};

export const proposalInitialState: ProposalState = {
  proposal: initProposal,
  loading: false
};
