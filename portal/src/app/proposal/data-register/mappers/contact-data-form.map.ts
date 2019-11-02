import { Address } from './../models/contact-data-form.model';
import {
  NormalizerResponse,
  NormalizerRequest,
  SelectedAddress
} from './../models/address-normalizer.model';
import { Customer, ProposalDTO } from '@app/proposal/api';
import { ContactDataForm } from '../models/contact-data-form.model';

/**
 * Maps the response from Get Proposal to Contact Data Form
 * @param getProposalRes The object from getProposal
 * @param customerType The type of customer
 */
export function GetProposalRes2ContactDataForm(
  getProposalRes: ProposalDTO,
  customerType: 'owner' | 'coOwner'
): ContactDataForm {
  let result: ContactDataForm;
  const customer = getProposalRes[customerType];
  if (customer && getProposalRes) {
    result = { ...Customer2ContactDataForm(customer) };
    return result;
  }
}

/**
 * Maps the values of a Contact Data Form to Patch Customer
 * @param personalDataForm The object from the personal data form
 */
export function ContactDataForm2PatchCustomer(
  contactDataForm: ContactDataForm
): Partial<Customer> {
  let result: Partial<Customer>;
  if (contactDataForm) {
    result = {
      ...ContactDataForm2Customer(contactDataForm)
    };
    return result;
  }
}

export function Customer2ContactDataForm(customer: Customer): ContactDataForm {
  const { address, cellPhone, email } = customer;
  if (!address && !cellPhone && !email) return;
  const result: ContactDataForm = {
    address,
    cellPhone,
    email
  };
  return result;
}

export function ContactDataForm2Customer(
  contactDataForm: ContactDataForm
): Partial<Customer> {
  const code = contactDataForm.cellPhone.areaCode;
  if (code.charAt(0) === '0') {
    contactDataForm.cellPhone.areaCode = code.slice(1);
  }

  const { address, cellPhone, email } = contactDataForm;

  const result: Partial<Customer> = {
    address,
    cellPhone,
    email
  };
  return result;
}

export function Address2NormalizerRequest(
  initAddress: Address
): NormalizerRequest {
  const {
    street,
    number,
    state,
    locality,
    postalCode,
    floor,
    apartment
  } = initAddress;

  const result: NormalizerRequest = {
    address: {
      street,
      number,
      state: {
        id: state.id.length < 2 ? `0${state.id}` : state.id,
        description: state.description,
        insuranceIntegrationCode: null
      },
      locality: { id: locality.id, description: locality.description },
      postalCode,
      floor,
      apartment
    }
  };

  return result;
}

export function NormalizerResponse2Address(
  normalizerRes: NormalizerResponse
): Address {
  const {
    number,
    stateCode,
    localityDesc,
    cp4: postalCode,
    floor,
    apartment
  } = normalizerRes;

  const result: Address = {
    street: normalizerRes.streetName.trim(),
    number,
    state: { id: stateCode, description: null },
    locality: { id: null, description: localityDesc },
    postalCode,
    floor,
    apartment
  };

  return result;
}

export function SelectedAddress2Address(
  selectedAddress: SelectedAddress
): Address {
  const fullAddress = selectedAddress.street;

  const { stateCode, localityDesc } = fullAddress;

  const result: Address = {
    street: fullAddress.streetName.trim(),
    number: Number(selectedAddress.number),
    state: { id: stateCode, description: null },
    locality: { id: null, description: localityDesc },
    postalCode: fullAddress.cp4 ? fullAddress.cp4.trim() : null,
    floor: null,
    apartment: null
  };

  return result;
}
