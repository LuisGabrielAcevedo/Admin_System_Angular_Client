import { Gender } from '@app/pre-proposal/api/gender';
import { DocumentType } from '@app/pre-proposal/api/documentType';
import { AfipActivity } from '@app/pre-proposal/api/afipActivity';
import { Brand } from '@app/pre-proposal/api/brand';
import { Model } from '@app/pre-proposal/api/model';
import { VehicleType } from '@app/pre-proposal/api/vehicleType';
import { FuelYear } from '@app/pre-proposal/api/fuelYear';
import {
  SIMULATION_TYPE,
  VEHICLE_TYPE
} from '@app/constants/vehicle.constants';

export interface IdCustomerDataForm {
  firstName: string;
  lastName: string;
  personalDocumentNumber: string;
  workDocumentNumber: string;
  gender: Gender;
  birthDate: string;
  personalDocumentType: DocumentType;
  salary?: number;
}

export interface IdVehicleDataForm {
  type: VehicleType;
  simulationType: string;
  brand: Brand;
  model: Model;
  year: FuelYear;
  price: number;
}

export interface ChildComponentOutput {
  value: IdCustomerDataForm | IdVehicleDataForm;
  valid: boolean;
  type: 'owner' | 'coOwner' | 'vehicle';
  touched: boolean;
}
