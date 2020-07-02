import { Injectable } from '@angular/core';
@Injectable()
export class PdfServiceMock {

	downloadPdf(_content: string, _name: string) {
	}

	createLink(_linkSource: string, _name: string) {
	}
}