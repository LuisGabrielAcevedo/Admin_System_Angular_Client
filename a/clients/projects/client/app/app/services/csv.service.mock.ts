import { Injectable } from '@angular/core';

@Injectable()
export class CSVServiceMock {

	constructor() {}

	buildURI(_values: []): string {
		return '';
	}

	downloadCSV(_content: string, _name: string): void {

	}
}
