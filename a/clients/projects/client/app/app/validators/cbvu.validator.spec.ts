import { CbvuValidator } from './cbvu.validator';
import { FormControl } from '@angular/forms';

describe('CbvuValidator', () => {
	const cbvuValidator = CbvuValidator;
	const control = new FormControl('input');

	it('should exist', () => {
		expect(cbvuValidator).toBeTruthy();
	});

	it('should be invalid if length is less than 22', () => {
		control.setValue('1234567891');
		const validation = cbvuValidator.valid(control);
		expect(validation).toEqual({ cbvuformat: true, missings: 12 });
	});

	it('should be invalid if length is greater than 22', () => {
		control.setValue('12345678911234567891123');
		const validation = cbvuValidator.valid(control);
		expect(validation).toEqual({ cbvuformat: true });
	});

	it('should be invalid if value has not numbers', () => {
		control.setValue('abcdefg');
		const validation = cbvuValidator.valid(control);
		expect(validation).toEqual({ cbvuformat: true });
	});

	it('should be valid if value has a length 22 characters and has just numbers', () => {
		control.setValue('1234567891123456789112');
		const validation = cbvuValidator.valid(control);
		expect(validation).toEqual(null);
	});
});
