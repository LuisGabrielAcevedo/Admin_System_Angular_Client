import { Customer, CustomerFactory } from '@app/pre-proposal/api/customer';
import { Store } from '@app/pre-proposal/api/store';
import { Vehicle, VehicleFactory } from '@app/pre-proposal/api/vehicle';

export interface Proposal {
  proposalId: number;
  owner: Customer;
  coOwner: Customer;
  store: Store; // sucursal
  uuid: string; // token
  vehicle: Vehicle;
}

export const ProposalFactory = (param: any = {}): Proposal => {
  const newProposal = {
    proposalId: null,
    owner: CustomerFactory(),
    coOwner: CustomerFactory(),
    store: {
      integrationCode: null,
      name: null
    },
    uuid: null,
    vehicle: VehicleFactory()
  };

  const result = { ...newProposal, ...param } as Proposal;

  return result;
};
