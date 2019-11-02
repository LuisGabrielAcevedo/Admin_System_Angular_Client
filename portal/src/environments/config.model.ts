export interface ApiConfigModules {
  domain: string;
  company: string;
  dataRegister: string;
  identification: string;
  persons: string;
  rates: string;
  rates_matching: string;
  identification_get: string;
  proposal: string;
  coupons: string;
  insurance: string;
  accounts: string;
  panel: string;
  checklist: string;
  ecm: string;
  formalization: string;
  addressNormalizer: string;
}

export interface LoginMap {
  DEFAULT: string;
  [key: string]: string;
}
export interface Environment {
  production: boolean;
  apiEndpoint: string;
  modules: ApiConfigModules;
  loginMap: LoginMap;
}

export interface Settings {
  env: string;
  baseHref: string;
  endpoint: string;
  loginMap: LoginMap;
}
