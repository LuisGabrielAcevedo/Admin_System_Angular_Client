import { Inject, Injectable } from '@angular/core';

import { Logger } from './polyfills';
import { CONFIG_MODULE_MAIN, mainConfigDefault } from './main.config';
import { IMainConfig, IMainConfigDefault } from './main.interfaces';
import { version } from './version';

@Injectable()
export class MainService {
	public config: IMainConfigDefault;
	public libVersion: string;

	constructor(@Inject(CONFIG_MODULE_MAIN) private _config?: IMainConfig) {
		this.libVersion = version;

		this.config = Object.assign({}, mainConfigDefault, this._config);
		Logger.loglevel = this.config.logLevel;
	}
}
