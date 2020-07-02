import { Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { IRequestState, IRequestsResponse, IRequest, IRequestFilters, IRequestCurrencySummary } from 'client/app/app/models';

@Injectable()
export class RequestsServiceMock {

	updateRequestsState(_data: Partial<IRequestState>) {
	}

	getRequestsState(): Observable<IRequestState> {
		return new Observable();
	}

	getRequests(): Observable<IRequestsResponse> {
		return new Observable();
	}

	getRequestById(_id: string): Observable<IRequestsResponse> {
		return new Observable();
	}

	findRequests(): void {
	}

	getRequestToShow(_data: IRequest[]) {
		return []
	}

	getRequestsGroupByCurrency(_data: IRequest[]) {
		return {};
	}

	get requestCurrencySummary(): IRequestCurrencySummary[] {
		return [];
	}

	get selectionText() {
		return '';
	}

	getOperationText(_request: IRequest): string {
		return '';
	}

	isServicePayment(_request: IRequest): boolean{
		return true;
	}

	isSalary(_request: IRequest): boolean {
		return true;
	}

	isCheckbook(_request: IRequest): boolean {
		return true;
	}

	isTransfer(_request: IRequest): boolean {
		return true;
	}

	validateSearchField(_request: IRequest, _filters: IRequestFilters): boolean {
		return true;
	}

	isScheduledSalary(_request: IRequest): boolean {
		return true;
	}

	validateCancelledRequests(_request: IRequest, _filters: IRequestFilters): boolean {
		return true;
	}

	validateScheduledType(_request: IRequest, _filters: IRequestFilters): boolean {
		return true;
	}

	validateType(_request: IRequest, _filters: IRequestFilters): boolean {
		return true;
	}

	validateState(_request: IRequest, _filters: IRequestFilters): boolean {
		return true;
	}

	validateDateRange(_request: IRequest, _filters: IRequestFilters): boolean {
		return true;
	}

	validateMyRequests(_request: IRequest, _filters: IRequestFilters): boolean {
		return true;
	}

	filterRequests(_requests: IRequest[], _filters: IRequestFilters): IRequest[] {
		return [];
	}

	selectRequest(_selectedRequests: IRequest[], _request: IRequest): IRequest[] {
		return [];
	}

	orderList(_request: IRequest[]): IRequest[] {
		return [];
	}

	resetSelectedState(): void {}

	resetState(): void {}

	cancelRequest(_request: IRequest): void{}
}
