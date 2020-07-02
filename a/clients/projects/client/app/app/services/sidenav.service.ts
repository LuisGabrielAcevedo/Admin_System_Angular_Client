import { Injectable, Output, EventEmitter } from '@angular/core';
import { ISidenavStep, ISidenavData, makeSidenavStep } from 'client/app/app/models/sidenav';

export interface IErrorConfiguration {
	message?: string;
	subtitle?: string;
	actionLabel?: string;
}

@Injectable()
export class SidenavService {
	opened = false;
	errorConfiguration: IErrorConfiguration = {};
	step: ISidenavStep = makeSidenavStep({});
	@Output() public reloadBackPageEvent: EventEmitter<any> = new EventEmitter();
	closeView = false;
	isRetryOnErrorLoading = false;
	error = false;
	history: ISidenavStep[] = [];

	retryOnErrorCallback: () => void = () => {};

	open(step: ISidenavStep) {
		this.step = step;
		this.history = [step];
		this.opened = true;
		this.resetError();
	}

	close() {
		this.opened = false;
		this.closeView = false;
		this.step =  makeSidenavStep({});
		this.history = [];
		this.resetError();
	}

	nextStep(step: ISidenavStep) {
		if (!this.opened) {
			this.open(step);
		} else {
			this.resetError();
			this.history = [...this.history, step];
			this.step = step;
		}		
	}

	prevStep() {
		this.goToStep(this.history.length - 1);
	}

	goToStep(dataStep: number) {
		if (dataStep > 0) {
			const step: ISidenavStep = {
				...this.history[dataStep - 1],
				data: this.step.data
			};
			this.step = step;
			this.history = this.history.slice(0, dataStep);
		} else {
			this.preClose();
		}
	}

	reset(data?: ISidenavData) {
		const step: ISidenavStep = this.history[0];
		if (data) {
			step.data = data;
		}
		this.open(step);
	}

	cancel() {
		this.closeView = !this.closeView;
	}

	preClose() {
		if (this.opened) {
			this.step.closeAction
			? this.cancel()
			: this.close();
		}
	}

	reloadBackPage() {
		this.reloadBackPageEvent.emit();
	}

	onError(callback: () => void, errorConfiguration: IErrorConfiguration = {}) {
		this.opened = true;
		this.errorConfiguration = errorConfiguration;
		this.error = true;
		this.isRetryOnErrorLoading = false;
		this.retryOnErrorCallback = () => { this.isRetryOnErrorLoading = true; callback(); };
	}

	resetError() {
		this.error = false;
		this.isRetryOnErrorLoading = false;
		this.errorConfiguration = {};
		this.retryOnErrorCallback = () => {};
	}

	get hasPreviousStep(): boolean {
		return this.history.length > 1;
	}
}
