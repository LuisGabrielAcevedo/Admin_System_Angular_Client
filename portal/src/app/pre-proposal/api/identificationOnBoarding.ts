import { Customer, CustomerFactory } from './customer';
import { Store, StoreFactory } from './store';
import { Vehicle, VehicleFactory } from './vehicle';

export interface IdentificatioOnBording {
  owner: Customer;
  coOwner: Customer;
  store: Store; // sucursal
  uuid: string; // token
  vehicle: Vehicle;
}

export const IdentificatioOnBordingFactory = (
  param: any = {}
): IdentificatioOnBording => {
  const newIdentification = {
    owner: CustomerFactory({}),
    coOwner: CustomerFactory({}),
    vehicle: VehicleFactory({}),
    store: StoreFactory({}),
    uuid: ''
  };

  const result = { ...newIdentification, ...param } as IdentificatioOnBording;

  return result;
};
