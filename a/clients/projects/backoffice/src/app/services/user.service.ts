import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of} from 'rxjs';
import {
	IUserState,
	makeUserState,
	IEnterpriseResponse,
	IUserResponse,
	IUsersResponse,
	makeUserDetails,
	makeEnterprise,
} from 'backoffice/src/app/models/user';
import { AgentDataService } from './data.service';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class UserService {
	userSubject = new BehaviorSubject<IUserState>(makeUserState({}));

	constructor(private dataService: AgentDataService) { }

	updateUserState(data: Partial<IUserState>) {
		this.userSubject.next(makeUserState({...this.getUserState().value, ...data}));
	}

	getUserState(): BehaviorSubject<IUserState> {
		return this.userSubject;
	}

	findEnterprise(cuit: number): Observable<boolean> {
		this.updateUserState({ loadingEnterprise: true, hasEnterpriseErrors: false });
		return this.getEnterprise(cuit).pipe(
			map((res: IEnterpriseResponse) => {
				if (res.success) {
					this.updateUserState({ 
						enterprise: makeEnterprise(res.data),
						searchedEnterprise: true,
						loadingEnterprise: false,
						hasEnterpriseErrors: false
					});
					return true;
				} else {
					this.updateUserState({ searchedEnterprise: true, loadingEnterprise: false, hasEnterpriseErrors: true });
					return false;
				}
			}),
			catchError(() => {
				this.updateUserState({ searchedEnterprise: true, loadingEnterprise: false, hasEnterpriseErrors: true });
				return of(false);
			})
		);
	}

	updateUsername(username: string) {
		this.updateUserState({
			userSelected: makeUserDetails({ username }),
			searchedUserDetails: false,
			loadingUserDetails: false,
			hasUserErrorsDetails: false
		});
	}

	findUser(username: string): Observable<boolean> {
		this.updateUserState({ loadingUserDetails: true, hasUserErrorsDetails: false });
		return this.getUser(username).pipe(
			map((res: IUserResponse) => {
				if (res.success) {
					this.updateUserState({
						userSelected: res.data.users[0],
						searchedUserDetails: true,
						loadingUserDetails: false,
						hasUserErrorsDetails: false
					});
					return true;
				} else {
					this.updateUserState({ searchedUserDetails: true, loadingUserDetails: false, hasUserErrorsDetails: true });
					return false;
				}
			}),
			catchError(() => {
				this.updateUserState({ searchedUserDetails: true, loadingUserDetails: false, hasUserErrorsDetails: true })
				return of(false);
			})
		);
	}

	findUsers() {
		this.updateUserState({ loadingUser: true, hasUserErrors: false });
		this.getUsers().subscribe((res: IUsersResponse) => {
			if (res.success) {
				this.updateUserState({
					users: res.data.users,
					searchedUser: true,
					loadingUser: false,
					hasUserErrors: false
				});
			} else {
				this.updateUserState({ searchedUser: true, loadingUser: false, hasUserErrors: true });
			}
		}, () => this.updateUserState({ searchedUser: true, loadingUser: false, hasUserErrors: true }));
	}

	getEnterprise(cuit: number): Observable<IEnterpriseResponse> {
		return this.dataService.get('v1/agents/search/enterprises', { params: { cuilt: cuit } });
	}

	getUser(username: string): Observable<IUserResponse> {
		return this.dataService.get(`v1/agents/search/users/${username}`);
	}

	getUsers(): Observable<IUsersResponse> {
		return this.dataService.get('v1/agents/search/users');
	}

}
