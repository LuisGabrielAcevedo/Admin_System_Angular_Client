export interface IUserEntity {
	id: string;
	name?: string;
}

export interface IUser extends IUserEntity {
	pass?: string;
	token?: string;
	refreshToken?: string;
}
