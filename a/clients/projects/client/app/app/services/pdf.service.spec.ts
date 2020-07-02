import { async, TestBed } from '@angular/core/testing';
import { PdfService } from './pdf.service';

declare global {
	interface Window { encodeURI: any; }
}

describe('PdfService', () => {
	let pdfService: PdfService;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			providers: [
				PdfService
			]
		});
	}));

	beforeEach(() => {
		pdfService = TestBed.get(PdfService);
	});

	it('should be created', () => {
		expect(pdfService).toBeTruthy();
	});

});
