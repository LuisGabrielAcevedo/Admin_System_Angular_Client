import { ApiConfigModules } from './config.model';

export const getMicroservicesModules = (
  server = 'http://10.149.0.72'
): ApiConfigModules => ({
  domain: `${server}:6073/`,
  company: `${server}:6013/`,
  dataRegister: `${server}:6849/`,
  identification: `${server}:6019/`,
  persons: `${server}:8090/`,
  rates: `${server}:8885/`,
  rates_matching: `${server}:8885/`,
  identification_get: `${server}:7860/`,
  proposal: `${server}:6849/`,
  coupons: `${server}:8885/`,
  insurance: `${server}:8885/`, // false
  accounts: `${server}/6015`,
  panel: `${server}/6850`,
  ecm: `${server}`,
  checklist: `${server}`,
  formalization: `${server}/6846`,
  addressNormalizer: `${server}/7232`
});
