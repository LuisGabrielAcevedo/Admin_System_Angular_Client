import { InjectionToken } from '@angular/core';

import { IMainConfigDefault } from './main.interfaces';

export const mainConfigDefault: IMainConfigDefault = {
	server: false,
	production: false,
	/**
	 * 'trace'
	 * 'info'
	 * 'log'
	 * 'warn'
	 * 'error'
	 * 'silent'
	 */
	logLevel: 'warn',
	storage: sessionStorage,
	prefix: 'mcy',
	envName: '',
	appName: '',
	appVersion: '',
	apiUrl: '',
	httpTimeout: 60000,
	showVersion: false,
};

export const CONFIG_MODULE_MAIN = new InjectionToken<string>('CONFIG_MODULE_MAIN');
