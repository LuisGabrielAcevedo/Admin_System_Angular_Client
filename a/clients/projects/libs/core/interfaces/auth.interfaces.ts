import { IUser } from './user.interfaces';

export interface IUserCredentials {
	username: string;
	password: string;
}

export interface IAuthentication {
	login(userCredentials: IUserCredentials): Promise<IUser>;
	logout(): Promise<any>;
	changeFirstPassword(password: string): Promise<void>;
	changePassword(oldPassword: string, newPassword: string): Promise<void>;
	recoveryPass(userCredentials: IUserCredentials): Promise<any>;
	saveNewPassword(data: {verificationCode: string, newPassword: string}): Promise<void>;
}
