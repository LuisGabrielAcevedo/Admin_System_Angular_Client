import { Injectable, Output, EventEmitter } from '@angular/core';
import { ISidenavStep, makeSidenavStep } from 'client/app/app/models';

@Injectable()
export class SidenavServiceMock {
	opened = false;
	step: ISidenavStep = makeSidenavStep({});
	@Output() public reloadBackPageEvent: EventEmitter<any> = new EventEmitter();
	closeView = false;
	history: ISidenavStep[] = [];

	open() {}

	close() {}

	nextStep() {}

	prevStep() {}

	goToStep(_dataStep: number) {}

	reset() {}

	cancel() {}

	preClose() {}

	onError() {}

	onSuccess() {}

}
