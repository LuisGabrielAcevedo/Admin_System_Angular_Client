import { InjectionToken } from '@angular/core';
import { ICoreConfigDefault } from './core.interfaces';

export const coreConfigDefault: ICoreConfigDefault = {
	dummy: true
};

export const CONFIG_MODULE_CORE = new InjectionToken<string>('CONFIG_MODULE_CORE');
