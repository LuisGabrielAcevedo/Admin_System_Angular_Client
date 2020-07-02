import { AbstractControl, ValidationErrors, FormGroup } from '@angular/forms';

export class DateRange {
	static valid = (form: FormGroup): ValidationErrors | null => {
		const startDate: AbstractControl | null = form.get('startDate');
		const endDate: AbstractControl | null = form.get('endDate');
		if (startDate && startDate.value && endDate && endDate.value) {
			const auxStart = new Date(startDate.value).getTime();
			const auxEnd = new Date(endDate.value).getTime();
			if (auxEnd >= auxStart) {
				return null;
			} else {
				return {
					invalidRange: true
				};
			}
		}
		return null;
	};
}
