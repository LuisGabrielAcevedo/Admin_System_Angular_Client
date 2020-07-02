import { async, TestBed } from '@angular/core/testing';
import { CSVService } from './csv.service';
declare global {
	interface Window { encodeURI: any; }
}

describe('ScreenService', () => {
	let csvService: CSVService;
	const dummyElement = document.createElement('a');
	const mockName = 'test name';
	const mockBlob = new Blob();
	const usersCSV = [
		['Nombre', 'CBU/CVU', 'Categoria', 'Referencia', 'Email'],
		['Jesús Moruga', '1234567890987654321234', 'Servicio', 'reference 0001', 'name.lastname.001@domain001.com'],
		['Pedro Moruga', '1234567890987654321235', 'Proveedor', 'reference 0002', 'name.lastname.002@domain001.com'],
		['Jose Riley', '1234567890123456789003', 'Cliente', 'reference 0003', 'jose-riley@example.com'],
		['Lisa Harris', '1234567890123456789004', 'Empleado', 'reference 0004', 'lisa-harris@example.com'],
		['Hannah Hanson', '1234567890123456789005', 'Otros', 'reference 0005', 'hannah-85@example.com'],
		['Sharon Hill', '1234567890123456789006', 'Servicio', 'reference 0006', 'sharon_hill@example.com'],
		['Ralph Cruz', '1234567890123456789007', 'Proveedor', 'reference 0007', 'ralph_cruz@example.com'],
		['Eric Nguyen', '1234567890123456789008', 'Cliente', 'reference 0008', 'eric-nguyen@example.com'],
		['Kevin Romero', '1234567890123456789009', 'Empleado', 'reference']
	];
	const stringCSV =
		'Nombre,CBU/CVU,Categoria,Referencia,Email\r\n'+
		'Jesús Moruga,1234567890987654321234,Servicio,reference 0001,name.lastname.001@domain001.com\r\n'+
		'Pedro Moruga,1234567890987654321235,Proveedor,reference 0002,name.lastname.002@domain001.com\r\n'+
		'Jose Riley,1234567890123456789003,Cliente,reference 0003,jose-riley@example.com\r\n'+
		'Lisa Harris,1234567890123456789004,Empleado,reference 0004,lisa-harris@example.com\r\n'+
		'Hannah Hanson,1234567890123456789005,Otros,reference 0005,hannah-85@example.com\r\n'+
		'Sharon Hill,1234567890123456789006,Servicio,reference 0006,sharon_hill@example.com\r\n'+
		'Ralph Cruz,1234567890123456789007,Proveedor,reference 0007,ralph_cruz@example.com\r\n'+
		'Eric Nguyen,1234567890123456789008,Cliente,reference 0008,eric-nguyen@example.com\r\n'+
		'Kevin Romero,1234567890123456789009,Empleado,reference\r\n';

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			providers: [
				CSVService
			]
		});
	}));

	beforeEach(() => {
		csvService = TestBed.get(CSVService);
	});

	it('should be created', () => {
		expect(csvService).toBeTruthy();
	});

	it('#downloadCSV should prepair the data to export to csv file', () => {
		spyOn(csvService, 'exportCSVFile');
		spyOn(csvService, 'convertToCSV');
		csvService.downloadCSV(usersCSV, mockName);
		expect(csvService.convertToCSV).toHaveBeenCalled();
		expect(csvService.exportCSVFile).toHaveBeenCalled();
	});

	it('#downloadCSV should prepair the data to export to csv file without a file name', () => {
		spyOn(csvService, 'exportCSVFile');
		spyOn(csvService, 'convertToCSV');
		csvService.downloadCSV(usersCSV, '');
		expect(csvService.convertToCSV).toHaveBeenCalledWith(usersCSV);
		expect(csvService.exportCSVFile).toHaveBeenCalled();
	});

	it('#convertToCSV should convert the array string format to string CSV format', () => {
		const resultCSV: string = csvService.convertToCSV(usersCSV);
		expect(resultCSV).toEqual(stringCSV);
	});

	it('#exportCSVFile should create an anchor element in the document', () => {
		csvService.isEdge = false;
		spyOn(document, 'createElement').and.returnValue(dummyElement);
		spyOn(document.body, 'appendChild');
		spyOn(document.body, 'removeChild');
		csvService.exportCSVFile(new Blob(), mockName);
		expect(document.createElement).toHaveBeenCalled();
		expect(document.body.appendChild).toHaveBeenCalled();
		expect(document.body.removeChild).toHaveBeenCalled();
	});

	it('#exportCSVFile should create an anchor element in the document in Edge', () => {
		csvService.isEdge = true;
		navigator.msSaveBlob = () => { return false };
		spyOn(navigator, 'msSaveBlob').and.returnValue(false);
		csvService.exportCSVFile(mockBlob, mockName);
		expect(navigator.msSaveBlob).toHaveBeenCalledWith(mockBlob, mockName);
	});
});
