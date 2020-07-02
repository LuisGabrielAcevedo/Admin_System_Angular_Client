import { IToastConfig } from './toast.service';

export class ToastServiceMock {

	message(_message: string, _toastConfig?: IToastConfig) {
		return;
	}

	error(_message: string, _toastConfig?: IToastConfig) {
		return;
	}

	success(_message: string, _toastConfig?: IToastConfig) {
		return;
	}


}
