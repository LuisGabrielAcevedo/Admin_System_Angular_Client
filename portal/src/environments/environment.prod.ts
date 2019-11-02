import { getGatewayModules } from './gateway.config';
import {
  Environment,
  Settings,
  ApiConfigModules,
  LoginMap
} from './config.model';

const SETTINGS: Settings = (window as any).appSettings || {};

const SERVER: string = SETTINGS.endpoint || '/';

const MODULES: ApiConfigModules = getGatewayModules(SERVER);

const LOGIN: LoginMap = SETTINGS.loginMap || { DEFAULT: '/' };

export const environment: Environment = {
  production: true,
  apiEndpoint: SERVER,
  modules: MODULES,
  loginMap: LOGIN
};
