import {
  getDateFromISO,
  getISOFromDate
} from './../../../shared/util/functions/iso-date.function';
import {
  PersonalDataForm,
  SpouseDataForm,
  SpouseDataFormFactory
} from '../models/personal-data-form.model';
import { ProposalDTO, Customer } from '@app/proposal/api';
import { Spouse } from '@app/proposal/api/patch.proposal.req';

/**
 * Maps the response from Get Proposal to Personal Data Form
 * @param getProposalRes The object from getProposal
 * @param customerType The type of customer
 */
export function GetProposalRes2PersonalDataForm(
  getProposalRes: ProposalDTO,
  customerType: 'owner' | 'coOwner'
): PersonalDataForm {
  let result: PersonalDataForm;
  const customer = getProposalRes[customerType];
  if (customer && getProposalRes) {
    result = {
      ...Customer2PersonalDataForm(customer),
      spouseData: Customer2SpouseData(customer)
    };
    return result;
  }
}

/**
 * Maps the values of a Personal Data Form to Patch Customer
 * @param personalDataForm The object from the personal data form
 */
export function PersonalDataForm2PatchCustomer(
  personalDataForm: PersonalDataForm,
  personType: 'OWNER' | 'CO_OWNER'
): Partial<Customer> {
  let result: Partial<Customer>;
  if (personalDataForm && personType) {
    result = {
      ...PersonalDataForm2Customer(personalDataForm, personType),
      nonParticipantSpouse: SpouseData2Customer(
        personalDataForm.spouseData,
        personType
      )
    };
    return result;
  }
}

/**
 * Maps a Customer object we get from back to Personal Data Form
 * @param customer The owner or coowner object
 */
export function Customer2PersonalDataForm(
  customer: Customer
): PersonalDataForm {
  const {
    firstName,
    lastName,
    birthDate,
    documentType: personalDocumentType,
    document: personalDocumentNumber,
    gender,
    countryOfBirth,
    nationality,
    maritalStatus,
    workDocumentType,
    cuitl: workDocumentNumber,
    ivaCategory,
    iibbCategory,
    pep
  } = customer;

  const result: PersonalDataForm = {
    firstName,
    lastName,
    birthDate: getDateFromISO(birthDate),
    personalDocumentType,
    personalDocumentNumber,
    gender,
    countryOfBirth,
    nationality,
    maritalStatus,
    workDocumentType,
    workDocumentNumber,
    ivaCategory,
    iibbCategory,
    isPep: pep ? pep.isPep : false,
    pepType: pep ? pep.type : null,
    pepReason: pep ? pep.reason : null,
    spouseData: null
  };
  return result;
}

/**
 * Maps a Customer object we get from back to the Spouse data inside personal
 * Data Form
 * @param customer The owner or coowner object
 */
export function Customer2SpouseData(customer: Customer): SpouseDataForm {
  if (!customer.nonParticipantSpouse) return SpouseDataFormFactory();
  const {
    firstName,
    lastName,
    birthDate,
    gender,
    workDocumentType,
    countryOfBirth,
    nationality,
    documentType: personalDocumentType,
    document: personalDocumentNumber,
    cuitl: workDocumentNumber
  } = customer.nonParticipantSpouse;

  const result: SpouseDataForm = {
    firstName,
    lastName,
    birthDate: getDateFromISO(birthDate),
    gender,
    workDocumentType,
    countryOfBirth,
    nationality,
    personalDocumentType,
    personalDocumentNumber,
    workDocumentNumber
  };
  return result;
}

export function PersonalDataForm2Customer(
  personalDataForm: PersonalDataForm,
  personType: 'OWNER' | 'CO_OWNER'
): Partial<Customer> {
  const {
    firstName,
    lastName,
    birthDate,
    personalDocumentType: documentType,
    personalDocumentNumber: document,
    gender,
    countryOfBirth,
    nationality,
    maritalStatus,
    workDocumentType,
    workDocumentNumber: cuitl,
    ivaCategory,
    iibbCategory,
    isPep,
    pepType,
    pepReason
  } = personalDataForm;

  const result: Partial<Customer> = {
    firstName,
    lastName,
    birthDate,
    documentType,
    document,
    gender,
    countryOfBirth,
    nationality,
    maritalStatus,
    workDocumentType,
    cuitl,
    ivaCategory,
    iibbCategory,
    pep: { isPep, type: pepType, reason: pepReason },
    nonParticipantSpouse: null,
    personType
  };
  return result;
}

export function SpouseData2Customer(
  spouseData: SpouseDataForm,
  personType: 'OWNER' | 'CO_OWNER'
): Spouse {
  if (!spouseData.firstName) return null;
  const {
    firstName,
    lastName,
    birthDate,
    gender,
    workDocumentType,
    countryOfBirth,
    nationality,
    personalDocumentType: documentType,
    personalDocumentNumber: document,
    workDocumentNumber: cuitl
  } = spouseData;
  const result: Spouse = {
    firstName,
    lastName,
    birthDate,
    gender,
    workDocumentType,
    countryOfBirth,
    nationality,
    documentType,
    document,
    cuitl,
    personType: personType === 'OWNER' ? 'OWNER_SPOUSE' : 'CO_OWNER_SPOUSE'
  };
  return result;
}
