import { DataService } from '@mcy/core/services/data.service';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { ISignCapacityResponse, ISignState, makeSignState, ISignCapacity, IRequest } from 'client/app/app/models';
import { switchMap } from 'rxjs/operators';
import { StatefulService } from './stateful.service';
import { EventService } from './event.service';
import { StorageService } from '@mcy/main/services/storage.service';
import { IUserRequest } from '../models/user';
import { UserService } from './user.service';

@Injectable()
export class SignaturesService extends StatefulService {
	public subject = new BehaviorSubject<ISignState>(makeSignState({}));
	public documentNumber: string = '';
	public documentType: string = '';
	constructor(
		public eventService: EventService,
		private dataService: DataService,
		private storage: StorageService,
		private userService: UserService,
	) {
		super(eventService);
		this.documentNumber = this.userService.getUserState().value.user.document.number;
		this.documentType = this.userService.getUserState().value.user.document.type;
	}

	// TODO: REMOVER HEADER CUANDO BE SOLUCIONE MANEJO DEL TOKEN PARA ESTE ENDPOINT!!!!
	getSignCapacity(requestIds: string[]): Observable<ISignCapacityResponse> {
		return this.dataService.post('v1/signsys/sign-capacity', {
			headers: {
				username: this.storage.getData('tempUser')
			},
			body: {
				transactionIds: requestIds
			}
		});
	}

	getSignState(): BehaviorSubject<ISignState> {
		return this.subject;
	}

	searchSignCapacity(request: IRequest): Observable<ISignCapacity | undefined>{
		const signCapacity: ISignCapacity = this.getSignState().value.searchedSignatures[request.id];
		if (signCapacity) {
			return of(signCapacity);
		} else {
			const isSigned: IUserRequest | undefined = request.signers.find(signatory =>
				signatory.document.number === this.documentNumber && signatory.document.type === this.documentType);

			if (request.state === 'AUTHORIZED' || request.state === 'REJECTED' || isSigned) {
				const signature: ISignCapacity = {
					id: request.id,
					signAllowed: true,
					signed: true
				}
				this.updateSignState({
					searchedSignatures: {
						... this.getSignState().value.searchedSignatures,
						[signature.id]: signature
					}
				});
				return of(signature);
			} else {
				return this.getSignCapacity([request.id]).pipe(
					switchMap((resp) => this.getCapacity(resp.data, request.id))
				)
			}
		}
	}

	getCapacity(data: ISignCapacity[], id: string): Observable<ISignCapacity | undefined> {
		const signature: ISignCapacity | undefined = data.find(sign => sign.id === id);
		if (signature) {
			this.updateSignState({
				searchedSignatures: {
					... this.getSignState().value.searchedSignatures,
					[signature.id]: signature
				}
			});
		}
		return of (signature);
	}

	updateSignState(data: Partial<ISignState>) {
		this.subject.next(
			makeSignState({
				...this.getSignState().value,
				...data
			})
		);
	}

	resetState() {
		this.updateSignState(makeSignState({}));
	}
}
