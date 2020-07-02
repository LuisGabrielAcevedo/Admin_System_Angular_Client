import { TestBed, async } from '@angular/core/testing';
import { ConceptService } from './concept.service';
import { DataService } from '@mcy/core/services/data.service';
import { DataServiceMock } from '@mcy/core/services/data.service.mock';
import { of } from 'rxjs';
import { IConceptResponse, makeConcept } from 'client/app/app/models';

describe('AuthService', () => {
	let service: ConceptService;
	let dataService: DataService;
	let conceptService: ConceptService;
	const conceptData: IConceptResponse = {
		success: true,
		status: [{
			code: '0',
			message: 'success'
		}],
		data: [
			makeConcept({})
		]
	};

	const conceptDataEmpty: IConceptResponse = {
		success: false,
		status: [{
			code: '1',
			message: 'You do not have concepts'
		}],
		data: []
	};

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				ConceptService,
				{ provide: DataService, useClass: DataServiceMock },
			]
		});
	});
	beforeEach(() => {
		service = TestBed.get(ConceptService);
		conceptService = TestBed.get(ConceptService);
		dataService = TestBed.get(DataService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should handle getConcepts', async(() => {
		spyOn(dataService, 'get').and.returnValue(of(conceptData));
		spyOn(conceptService, 'updateConceptState');
		conceptService.getConcepts().subscribe((isSuccess) => {
			expect(isSuccess).toBeTrue();
			expect(dataService.get).toHaveBeenCalled();
			expect(conceptService.updateConceptState).toHaveBeenCalled();
		});
	}));

	it('should handle failing getConcepts', async(() => {
		spyOn(dataService, 'get').and.returnValue(of(conceptDataEmpty));
		conceptService.getConcepts().subscribe((isSuccess) => {
			expect(isSuccess).toBeFalse();
			expect(dataService.get).toHaveBeenCalled();
		});
	}));
});
