import { Component, Output, EventEmitter, Input } from '@angular/core';


@Component({
	selector: 'mcy-signup-stepper',
	templateUrl: './signup-stepper.component.html',
	styleUrls: ['./signup-stepper.component.scss'],
})
export class SignupStepperComponent {
	@Input() selectedStep: 'positiveValidation' | 'personalData' | 'accessData' | 'success' | 'updatePassword' = 'positiveValidation';
	
	@Input() isUpdatePasswordFlow: boolean = false;

	@Input() isPersonalDataValid: boolean = false;
	@Input() isAccessDataValid: boolean = false;
	@Input() isPositiveValidationValid: boolean = false;
	@Input() isUpdatePasswordValid: boolean = false;

	@Input() isPersonalDataChecked: boolean = false;
	@Input() isAccessDataChecked: boolean = false;
	@Input() isPositiveValidationChecked: boolean = false;
	@Input() isUpdatePasswordChecked: boolean = false;

	@Output() handlePersonalDataClick = new EventEmitter();
	@Output() handleAccessDataClick = new EventEmitter();
	@Output() handlePositiveValidationClick = new EventEmitter();

	onPersonalDataClick() {
		this.handlePersonalDataClick.emit();
	}

	onAccessDataClick() {
		this.handleAccessDataClick.emit();
	}

	onPositiveValidationClick() {
		this.handlePositiveValidationClick.emit();
	}

	get isPersonalDataSelected(): boolean {
		return this.selectedStep === 'personalData';
	}
	
	get isPositiveValidationSelected(): boolean {
		return this.selectedStep === 'positiveValidation';
	}


	get isAccessDataSelected(): boolean {
		return this.selectedStep === 'accessData';
	}

	get isSuccessSelected(): boolean {
		return this.selectedStep === 'success';
	}

	get isUpdatePasswordSelected(): boolean {
		return this.selectedStep === 'updatePassword'
	}
}
