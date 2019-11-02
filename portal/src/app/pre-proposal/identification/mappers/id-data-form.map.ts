import { UserSellingPoint } from '@app/common/login/models/state/selling-point';
import {
  IdCustomerDataForm,
  IdVehicleDataForm
} from '../../models/id-data-form.model';
import {
  OnBoarding,
  OnBoardingCustomer,
  OnBoardingVehicle
} from '../../models/id-onboarding.model';

/**
 * Maps the values of an Id Data Form to OnBoarding Post
 * @param ownerDataForm The data from the owner
 * @param coOwnerDataForm The data from the coOwner
 * @param vehicleDataForm The data from the vehicle
 * @param hasCoOwner Boolean if the owner has coOwner
 * @param isMarried Boolean if owner and coOwner are married
 * @param sellingPoint The selected selling point
 * @param uuid The request TOKEN
 */
export function IdDataForm2OnBoarding(
  ownerDataForm: IdCustomerDataForm,
  coOwnerDataForm: IdCustomerDataForm,
  vehicleDataForm: IdVehicleDataForm,
  hasCoOwner: boolean,
  isMarried: boolean,
  worksInDependencyRelationship: boolean,
  sellingPoint: UserSellingPoint,
  uuid: string = ''
): OnBoarding {
  let result: OnBoarding;
  if (ownerDataForm && vehicleDataForm) {
    result = {
      identificationDTO: {
        customer: IdCustomerForm2OnBoardingOwner(
          ownerDataForm,
          isMarried,
          worksInDependencyRelationship
        ),
        coOwner: IdCustomerForm2OnBoardingCoOwner(
          coOwnerDataForm,
          isMarried,
          hasCoOwner
        ),
        vehicle: IdVehicleForm2OnBoardingVehicle(vehicleDataForm),
        store: {
          id: sellingPoint.id,
          name: sellingPoint.name,
          integrationCode: sellingPoint.code
        },
        uuid
      }
    };
    return result;
  }
}

/**
 * Maps the values from a customer form to an onBoarding owner
 * @param ownerDataForm The data from the owner
 * @param vehicleDataForm The data from the vehicle
 * @param isMarried Boolean if owner and coOwner are married
 */
export function IdCustomerForm2OnBoardingOwner(
  ownerDataForm: IdCustomerDataForm,
  isMarried: boolean,
  worksInDependencyRelationship: boolean
): OnBoardingCustomer {
  const {
    firstName,
    lastName,
    personalDocumentNumber: document,
    workDocumentNumber: cuitl,
    gender,
    birthDate,
    personalDocumentType: documentType,
    salary: income
  } = ownerDataForm;

  const result: OnBoardingCustomer = {
    firstName,
    lastName,
    document,
    cuitl,
    gender,
    birthDate,
    documentType,
    income,
    isMarriedWithCoOwner: isMarried,
    worksInDependencyRelationship,
    owner: true,
    phone: ''
  };
  return result;
}

/**
 * Maps the values from a customer form to an onBoarding coOwner
 * @param coOwnerDataForm The data from the coOwner
 * @param vehicleDataForm The data from the vehicle
 * @param isMarried Boolean if owner and coOwner are married
 * @param hasCoOwner Boolean if there's a coOwner
 */
export function IdCustomerForm2OnBoardingCoOwner(
  coOwnerDataForm: IdCustomerDataForm,
  isMarried: boolean,
  hasCoOwner: boolean
): OnBoardingCustomer {
  if (!hasCoOwner) return null;
  const {
    firstName,
    lastName,
    personalDocumentNumber: document,
    workDocumentNumber: cuitl,
    gender,
    birthDate,
    personalDocumentType: documentType,
    salary: income
  } = coOwnerDataForm;

  const result: OnBoardingCustomer = {
    firstName,
    lastName,
    document,
    cuitl,
    gender,
    birthDate,
    documentType,
    income,
    isMarriedWithCoOwner: isMarried,
    owner: false,
    phone: ''
  };
  return result;
}

/**
 * Maps the values from a vehicle form to an onBoarding vehicle
 * @param vehicleDataForm The data from the vehicle
 */
export function IdVehicleForm2OnBoardingVehicle(
  vehicleDataForm: IdVehicleDataForm
): OnBoardingVehicle {
  const {
    type: vehicleType,
    brand,
    model,
    year: fuelYear,
    price: purchaseValue
  } = vehicleDataForm;

  const result: OnBoardingVehicle = {
    brand,
    model,
    fuelYear,
    purchaseValue,
    taxi: false,
    adapted: null,
    vehicleType
  };
  return result;
}
