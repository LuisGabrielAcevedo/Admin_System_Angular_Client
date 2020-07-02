import { Injectable } from '@angular/core';
import { MainService } from '../main.service';

@Injectable()
export class StorageService {
	storage: Storage;
	prefix: string;
	data = new Map();
	dataInMemory = new Map();

	constructor(private mainService: MainService) {
		this.storage = this.mainService.config.storage;
		this.prefix = this.mainService.config.prefix;
	}

	public setData(name: string, data: any): void {
		info('setData', name, data);

		this.data.set(name, data);

		this.saveData(name, data);
	}

	public getData(name: string): any {
		let data = this.data.get(name);

		if (data !== undefined) {
			info('getData (cached)', name, data);
			return data;
		}

		data = this.retrieveData(name);

		info('getData (storage)', name, data);

		this.data.set(name, data);

		return data;
	}

	public removeData(name: string): void {
		this.data.delete(name);
		this.storage.removeItem(this.prefix + name);
	}

	public clear() {
		this.clearMemory();
		this.validateStorage();

		Object.keys(this.storage).forEach(key => {
			const regExp = new RegExp(`^${ this.prefix }*`);
			if (key.match(regExp)) {
				this.removeData(key.replace(regExp, ''));
			}
		});
	}

	// IN MEMORY
	public setDataMemory(name: string, data: any): void {
		info('setDataMemory', name, data);
		this.dataInMemory.set(name, data);
	}

	public getDataMemory<T>(name: string): T {
		const data = this.dataInMemory.get(name);
		info('getDataMemory', name, data);
		return data;
	}

	public removeDataMemory(name: string): void {
		this.dataInMemory.delete(name);
	}

	public clearMemory() {
		this.dataInMemory.clear();
	}


	private saveData(name: string, data: any): void {
		this.validateStorage();

		if (data === undefined) {
			return;
		}

		let entries = JSON.stringify(data);

		if (this.mainService.config.production) {
			entries = window.btoa(entries);
		}

		this.storage.setItem(this.prefix + name, entries);
	}

	private retrieveData(name: string): any {
		this.validateStorage();

		let data = this.storage.getItem(this.prefix + name);
		if (data) {
			try {
				if (this.mainService.config.production) {
					data = window.atob(data);
				}

				data = JSON.parse(data);
			} catch (e) {
				// if can not read the sessionStorage
				this.storage.removeItem(this.prefix + name);
				data = null;
			}

			return data;
		}
	}

	private validateStorage() {
		if (!this.storage) {
			throw new Error('Storage does not available');
		}
	}

}
