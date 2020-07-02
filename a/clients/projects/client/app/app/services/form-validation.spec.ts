import { TestBed } from '@angular/core/testing';
import { FormValidationsService } from './form-validations.service';
import { FormControl } from '@angular/forms';
describe('SidenavService', () => {
	let service: FormValidationsService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [FormValidationsService]
		});
	});
	beforeEach(() => {
		service = TestBed.get(FormValidationsService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('when the control value is an object, the function isObject should return null', () => {
		const field: FormControl = new FormControl('Test');
		const resp1 = service.isObject(field);
		expect(resp1).toEqual({ isObject: true });
		field.patchValue({
			test: true
		});
		const resp2 = service.isObject(field);
		expect(resp2).toBeNull();
	});
});
