import { Injectable } from '@angular/core';

@Injectable()
export class StorageServiceMock {


	constructor() {
	}

	public setData(_name: string, _data: any): void {}

	public getData(_name: string): any {}

	public removeData(_name: string): void {}

	public clear() {}

	public setDataMemory(_name: string, _data: any): void {}

	public getDataMemory<T>(name: any): T {
		return name;
	}

	public removeDataMemory(_name: string): void {}

	public clearMemory() {}

}
