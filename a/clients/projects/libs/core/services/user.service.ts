// import { Injectable } from '@angular/core';
// import { IAuthentication } from '../interfaces/auth.interfaces';
//
// @Injectable()
// export class UserService implements IAuthentication {
// 	public currentUser: IUser | null; // for share in the app.
//
// 	constructor(private store: StorageService, private mainService: MainService) {
// 		this.cognitoUser = null;
// 		this.currentUser = null;
// 	}
//
// 	public login(userCredentials: IUserCredentials): Promise<IUser> {
// 		// TODO: cambiar a observable
// 		this.resetUser();
//
// 	}
//
// 	public logout(): Promise<any> {
// 		// TODO: cambiar a observable
// 		return new Promise((resolve, reject) => {
//
// 			this.resetUser();
//
// 		});
//
// 	}
//
// 	public recoveryPass(userCredentials: IUserCredentials): Promise<any> {
// 	}
//
// 	public saveNewPassword(data: {verificationCode: string, newPassword: string}): Promise<void> {
// 	}
//
//
// 	public changeFirstPassword(password: string): Promise<void> {
// 	}
//
// 	public changePassword(oldPassword: string, newPassword: string): Promise<void> {
// 	}
//
// 	private resetUser() {
// 		this.currentUser = null;
// 		this.store.clear();
// 		this.store.clearMemory();
// 	}
//
// 	private buildCurrentUser(userCredentials: IUserCredentials, result: any): IUser {
// 		return {
// 			type: 'normal',
// 			pass: userCredentials.password,
// 			token: result.idToken.jwtToken,
// 			entity: {
// 				id: result.idToken.payload['cognito:username'],
// 				name: result.idToken.payload.name
// 			}
// 		};
// 	}
// }
