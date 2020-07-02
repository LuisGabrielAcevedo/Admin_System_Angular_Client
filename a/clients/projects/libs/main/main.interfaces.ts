export interface IMainConfig {
	server?: boolean;
	production?: boolean;
	logLevel?: string;
	storage?: Storage;
	prefix?: string;
	apiUrl?: string;
	envName?: string;
	appName?: string;
	appVersion?: string;
	httpTimeout?: number;
	showVersion?: boolean;
}

export interface IMainConfigDefault extends IMainConfig {
	server: boolean;
	production: boolean;
	logLevel: string;
	storage: Storage;
	prefix: string;
	apiUrl: string;
	envName: string;
	appName: string;
	appVersion: string;
	httpTimeout: number;
	showVersion: boolean;
}
