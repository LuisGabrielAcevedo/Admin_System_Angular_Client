import { ApiConfigModules } from './config.model';

export const getGatewayModules = (
  server = 'http://10.149.0.74:9999/api'
): ApiConfigModules => ({
  domain: `${server}/domains/`,
  company: `${server}/companies/`,
  dataRegister: `${server}/proposal/`,
  identification: `${server}/onboarding/`,
  persons: `${server}/persons/`, // Not Working
  rates: `${server}/rates/`,
  rates_matching: `${server}/rates/`,
  identification_get: `${server}/onboarding/`,
  proposal: `${server}/proposal/`,
  coupons: `${server}/rates/`,
  insurance: `${server}/insurance/`,
  accounts: `${server}/accounts/`,
  panel: `${server}/panel/`,
  //document: `https://viverebrasil.com.br/sanrioapigwdsv/frontend/mocks/document/`,
  ecm: `${server}/ecm/`,
  checklist: `${server}/checklist/`,
  formalization: `${server}/formalization/`,
  addressNormalizer: `${server}/address-normalizer`
});
