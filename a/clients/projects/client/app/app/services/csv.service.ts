import { Injectable } from '@angular/core';
@Injectable()
export class CSVService {
	public isEdge: boolean = navigator.userAgent.includes('Edge');
	constructor() {}

	downloadCSV(content: string[][], name: string): void {
		const csv = this.convertToCSV(content);
		const exportedFilename = name !== ''
			? name + '.csv'
			: 'export.csv';
		const blob = new Blob(['\uFEFF'+csv], { type: 'text/csv;charset=utf-8;' });
		this.exportCSVFile(blob, exportedFilename);
	}

	exportCSVFile(blob: Blob, fileTitle: string) {
		if (this.isEdge) { // is Edge
			navigator.msSaveBlob(blob, fileTitle);
		} else {
			const link = document.createElement('a');
			if (link.download !== undefined) {
				// Browsers that support HTML5 download attribute
				const url = URL.createObjectURL(blob);
				link.setAttribute('href', url);
				link.setAttribute('download', fileTitle);
				link.style.visibility = 'hidden';
				document.body.appendChild(link);
				link.click();
				document.body.removeChild(link);
			}
		}
	}

	convertToCSV(objArray: string[][]): string {
		let stringCSV = '';
		objArray.forEach((lineArray: string[]) => {
			let line = '';
			lineArray.forEach((word: string) => {
				if (line !== '') {
					line += ',';
				};
				line += word;
			});
			stringCSV += line + '\r\n';
		});
		return stringCSV;
	}
}
