import { DocumentType, Spouse } from '@app/proposal/api/patch.proposal.req';
import {
  Gender,
  Brand,
  FuelYear,
  Model,
  VehicleType,
  AfipActivity,
  Store
} from '@app/proposal/api/proposal';

export interface tempProposalDTO {
  coOwner: tempCustomerDTO;
  financedAmount: number;
  installmentValue: number;
  owner: tempCustomerDTO;
  productCode: string;
  proposalNumber: number;
  scoring: string;
  store: Store;
  terms: number;
  vehicle: tempVehicleDTO;
}

export interface tempCustomerDTO {
  afipActivity: AfipActivity;
  afipActivityInitDate: string;
  birthDate: string;
  cuitl: string;
  document: string;
  documentType: DocumentType;
  firstName: string;
  gender: Gender;
  income: number;
  isMarriedWithCoOwner: boolean;
  lastName: string;
  markPerson: string;
  marriedWithCoOwner: boolean;
  nonParticipantSpouse: Spouse;
  nup: number;
  owner: boolean;
  phone: string;
}

export interface tempVehicleDTO {
  adapted: boolean;
  brand: Brand;
  fuelYear: FuelYear;
  model: Model;
  purchaseValue: number;
  taxi: boolean;
  used: boolean;
  vehicleType: VehicleType;
}
