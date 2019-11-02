import { Brand } from './brand';
import { Model } from './model';
import { VehicleType } from './vehicleType';
import { FuelYear } from './fuelYear';

export interface Vehicle {
  adapted: boolean;
  brand: Brand;
  model: Model;
  vehicleType: VehicleType;
  fuelYear: FuelYear;
  purchaseValue: number;
  used: boolean;
}

export const VehicleFactory = (param: any = {}): Vehicle => {
  const newVehicle = {
    adapted: null,
    brand: {
      id: ''
    },
    model: {
      id: ''
    },
    vehicleType: {
      id: '',
      code: null
    },
    fuelYear: {
      id: '',
      year: null,
      zeroKm: null
    },
    purchaseValue: null
  };

  const result = { ...newVehicle, ...param } as Vehicle;

  return result;
};
