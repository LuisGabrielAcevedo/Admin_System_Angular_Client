export interface Owner {
  firstName: string;
  lastName: string;
  document: string;
}
export interface VehicleType {
  id: number;
  description: string;
  filter: string;
  inativo: boolean;
  organizationId: number;
}

export interface Brand {
  id: number;
  description: string;
  integrationCode: string;
  inactive: boolean;
  organizationId: number;
}

export interface Model {
  id: number;
  description: string;
  integrationCode: string;
  disabled: boolean;
  organizationId: number;
}

export interface FuelYear {
  id: number;
  year: number;
  integrationCode?: any;
  description?: any;
  zeroKm: boolean;
  inactive: boolean;
  organizationId: number;
  fuelType?: any;
  origin: string;
}

export interface Vehicle {
  vehicleType: VehicleType;
  brand: Brand;
  model: Model;
  fuelYear: FuelYear;
  purchaseValue: number;
  adapted: boolean;
  taxi: boolean;
  used: boolean;
}

export interface ProposalListResponse {
  proposalNumber: number;
  financedAmount: number;
  terms?: any;
  installmentValue?: any;
  productCode?: any;
  owner: Owner;
  coOwner?: any;
  vehicle: Vehicle;
  store?: any;
  scoring?: any;
  status?: any;
  creationDate: string;
}

export interface GetProposalListResponse {
  pageNumber: number;
  proposalResponseList: ProposalListResponse[];
  totalElements: number;
}
