import { Injectable } from '@angular/core';
import { DOWNLOADED_FILE_NAME } from 'client/app/app/constants/index';
import { format } from 'date-fns';

@Injectable()
export class PdfService {

	downloadPdf(content: string) {
		const fileName = `${DOWNLOADED_FILE_NAME}_${this.getFormatedDate()}`;
		const linkSource = this.processFile(content);
		this.createLink(linkSource, fileName);
	}

	createLink(linkSource: string, name: string) {
		const downloadLink = document.createElement('a');
		const fileName = `${name}.pdf`;

		downloadLink.href = linkSource;
		downloadLink.download = fileName;
		downloadLink.click();
	}

	processFile(content: string) {
		const byteCharacters = atob(content);
		const byteNumbers = new Array(byteCharacters.length);
		for (let i = 0; i < byteCharacters.length; i++) {
			byteNumbers[i] = byteCharacters.charCodeAt(i);
		}
		const byteArray = new Uint8Array(byteNumbers);
		const file = new Blob([byteArray], { type: 'application/pdf;base64' });
		const fileURL = URL.createObjectURL(file);

		return fileURL;
	}

	 getFormatedDate(): string{		
		return format(new Date(), `dd'-'MM'-'yyyy'_'HH'-'mm'-'ss`);		
	}
}
