import { ApiConfigModules } from './config.model';

export const getMockModules = (
  server = 'http://localhost:3000'
): ApiConfigModules => ({
  domain: `${server}/domain/`,
  company: `${server}/company-types/`,
  dataRegister: `${server}/data-register/`,
  identification: `${server}/identification/`,
  persons: `${server}/domain/`,
  rates: `${server}/`,
  rates_matching: `${server}/`,
  identification_get: `${server}/`,
  proposal: `${server}/proposal/`,
  coupons: `${server}/`,
  insurance: `${server}/insurances/`,
  accounts: `${server}/accounts/`,
  panel: `${server}/panel/`,
  checklist: `${server}/checklist/`,
  ecm: `${server}/ecm/`,
  formalization: `${server}/formalization/`,
  addressNormalizer: `${server}/address-normalizer`
});
