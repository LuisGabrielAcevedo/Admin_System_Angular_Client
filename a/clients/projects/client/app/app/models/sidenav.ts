
export interface ISidenavStep {
	title: string;
	hasMoreData?: boolean;
	component: any;
	closeAction?: ISidenavClose
	data?: ISidenavData;
}

export interface ISidenavData {
	[key: string]: any;
	onConfirm?: any;
	onClose?: any;
}

export interface ISidenavClose {
	text: string;
	confirmText: string;
	confirmCallback?: () => void;
	cancelText: string;
	cancelCallback?: () => void;
}

export enum FeedbackStatus {
	success = 'OK',
	error = 'ERROR',
	info = 'INFO'
}

export interface ISoftTokenResponse {
	error: {
		softToken?: boolean
	}
}

export function makeSidenavStep(data: Partial<ISidenavStep>): ISidenavStep {
	const defaultValue: ISidenavStep = {
		title: '',
		component: null
	};
	return { ...defaultValue, ...data };
}

export function makeSidenavData(data: Partial<ISidenavData>): ISidenavData {
	const defaultValue: ISidenavData = {};
	return { ...defaultValue, ...data };
}

export function makeSidenavClose(data: Partial<ISidenavClose>): ISidenavClose {
	const defaultValue: ISidenavClose = {
		text: '',
		confirmText: '',
		cancelText: ''
	};
	return { ...defaultValue, ...data };
}

export function makeSoftTokenResponse(data: Partial<ISoftTokenResponse>): ISoftTokenResponse {
	const defaultValue: ISoftTokenResponse = {
		error: {
			softToken: false
		}
	};
	return { ...defaultValue, ...data };
}
