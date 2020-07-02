export class Logger {
	// be careful with the order, is important!
	public static levels: string[] = [
		'trace',
		'info',
		'log',
		'warn',
		'error',
		'silent'
	];

	private static _loglevel: number = Logger.convertLoglevel('silent');

	public static set loglevel(value: string) {
		Logger._loglevel = Logger.convertLoglevel(value);
	}

	public static get loglevel(): string {
		return Logger.levels[Logger._loglevel];
	}

	private static convertLoglevel(level: string): number {
		let index = Logger.levels.indexOf(level);

		if (index === -1) {
			console.warn('LogLevel invalid on common module');
			index = 0;
		}

		return index;
	}

	public static trace(...messages: any): void {
		if (messages.length > 0 && Logger._loglevel === 0) {
			// tslint:disable-next-line:no-console
			console.trace(...messages);
		}
	}

	public static event(...eventName: any): void {
		if (eventName.length > 0 && Logger._loglevel <= 1) {
			console.warn('[Event:', ...eventName, new Date().toISOString(), ']');
		}
	}

	public static info(...messages: any): void {
		if (messages.length > 0 && Logger._loglevel <= 1) {
			console.log(...messages);
		}
	}

	public static group(...messages: any): void {
		if (messages.length > 0 && Logger._loglevel <= 2) {
			console.group(...messages);
		}
	}

	public static groupEnd(): void {
		if (Logger._loglevel <= 2) {
			console.groupEnd();
		}
	}

	public static log(...messages: any): void {
		if (messages.length > 0 && Logger._loglevel <= 2) {
			console.log(...messages);
		}
	}

	public static warn(...messages: any): void {
		if (messages.length > 0 && Logger._loglevel <= 3) {
			console.warn(...messages);
		}
	}

	public static error(...messages: any): void {
		if (messages.length > 0 && Logger._loglevel <= 4) {
			console.error(...messages);
		}
	}
}

export class Utils {
	static isEmpty(obj: any) {
		for (const key in obj) {
			if (obj.hasOwnProperty(key)) {
				return false;
			}
		}
		return true;
	}

	static mergeDeep(target: any, source: any) {
		const output = Object.assign({}, target);
		if (this.isObject(target) && this.isObject(source)) {
			Object.keys(source).forEach(key => {
				if (this.isObject(source[key])) {
					if (!(key in target)) {
						Object.assign(output, {
							[key]: source[key]
						});
					} else {
						output[key] = this.mergeDeep(target[key], source[key]);
					}
				} else {
					Object.assign(output, {
						[key]: source[key]
					});
				}
			});
		}
		return output;
	}

	static isObject(item: any) {
		return (item && typeof item === 'object' && !Array.isArray(item));
	}

	static compareField(field: any, obj1: any, obj2: any): boolean {
		return obj1 && obj2 ? obj1[field] === obj2[field] : obj1 === obj2;
	}
}

// remember if you do changes on it, you should change on types.d.ts too
(window as any).trace = Logger.trace;
(window as any).logEvent = Logger.event;
(window as any).group = Logger.group;
(window as any).groupEnd = Logger.groupEnd;
(window as any).info = Logger.info;
(window as any).log = Logger.log;
(window as any).warn = Logger.warn;
(window as any).logError = Logger.error;
