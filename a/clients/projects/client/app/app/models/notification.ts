import { IApiResponseArray } from '@mcy/core/interfaces/api.interfaces';

export interface INotification extends INotificationBFF{
	readStatus : boolean;
}

export interface INotificationBFF {
	id: string,
	notificationId: string;
	enterpriseId: string;
	channelId: string;
	title: string;
	message: string;
	status: string;
	createDate: string;
	modificationDate: string;
	readDate: string;
	notificationType: notificationTypeEnum;
	data: INotificationData[];
}

export interface INotificationData {
	id: number,
	fieldName: string;
	fieldValue: string;
	notification: any;
}

export interface INotificationState {
	notifications: INotification[];
	loading: boolean;
	searchedNotifications: boolean;
	hasErrors: boolean
}

export interface INotificationResponse extends IApiResponseArray<INotificationBFF> {}

export function makeNotificationBFF(data: Partial<INotificationBFF>): INotificationBFF {
	const defaultValue: INotificationBFF = {
		id: '0',
		notificationId: '',
		enterpriseId: '',
		channelId: '',
		title: '',
		message: '',
		status: '',
		createDate: '',
		modificationDate: '',
		readDate: '',
		notificationType: notificationTypeEnum.checks,
		data: []
	}

	return { ...defaultValue, ...data };
}


export function makeNotificationByNotificationBFF (data: Partial<INotificationBFF>) : INotification {
	const notificationBFF: INotificationBFF = makeNotificationBFF(data);
	return { ...notificationBFF, readStatus: notificationBFF.readDate ? true : false }	
}

export function makeNotificationState(data: Partial<INotificationState>): INotificationState {
	const defaultValue: INotificationState = {
		notifications: [],
		loading: false,
		searchedNotifications: false,
		hasErrors: false
	}
	return { ...defaultValue, ...data}
}

export function makeNotification(data: Partial<INotification>) {
	const defaultValue = { ...makeNotificationBFF({}), readStatus: false};
	return { ...defaultValue, ...data };
}

export enum notificationTypeEnum {
	checks = 'CHEQUES',
	requests = 'SOLICITUDES',
	services = 'SERVICIOS',
	payments = 'PAGOS',
	tranfers = 'TRANSFERENCIAS',
	token = 'TOKEN',
	power = 'PODERES',
	keys = 'CLAVES'
}

export interface INotificationGroup {
	[key: string]: INotification[];
}

