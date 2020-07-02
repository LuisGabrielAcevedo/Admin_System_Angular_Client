import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarDismiss } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

export interface IToastConfig {
	buttonLabel?: string;
	duration?: number;
	horizontalPosition?: 'start' | 'center' | 'end' | 'left' | 'right';
	verticalPosition?: 'top' | 'bottom',
	panelClass: string[],
}

interface IToastObservable {
	afterOpened: Observable<void>;
	onAction: Observable<void>;
	afterDismissed: Observable<MatSnackBarDismiss>;
	dismiss(): void;
	dismissWithAction(): void;
}

@Injectable()
export class ToastService {
	snackBarConfigDefault: IToastConfig;

	constructor(private snackBar: MatSnackBar) {
		this.snackBarConfigDefault = {
			duration: 10000,
			horizontalPosition: 'left',
			panelClass: ['default']
		};
	}

	error(message: string, toastConfig?: IToastConfig): IToastObservable {
		const panelClass = toastConfig ? toastConfig.panelClass : [];
		return this.message(
			message,
			{
				...toastConfig,
				panelClass: [...panelClass, 'snackbar-status', 'snackbar-error']
			},
		);
	}

	success(message: string, toastConfig?: IToastConfig): IToastObservable {
		const panelClass = toastConfig ? toastConfig.panelClass : [];
		return this.message(
			message,
			{
				...toastConfig,
				panelClass: [...panelClass, 'snackbar-status', 'snackbar-success']
			}
		);
	}

	message(message: string, toastConfig?: IToastConfig): IToastObservable {
		const snackBarConfig = toastConfig
			? Object.assign({}, this.snackBarConfigDefault, toastConfig)
			: this.snackBarConfigDefault;

		const snackBarRef = this.snackBar.open(message, snackBarConfig.buttonLabel, {
			duration: snackBarConfig.duration,
			horizontalPosition: snackBarConfig.horizontalPosition,
			verticalPosition: snackBarConfig.verticalPosition,
			panelClass: snackBarConfig.panelClass
		});

		return {
			afterOpened: snackBarRef.afterOpened(),
			onAction: snackBarRef.onAction(),
			afterDismissed: snackBarRef.afterDismissed(),
			dismiss: snackBarRef.dismiss.bind(snackBarRef),
			dismissWithAction: snackBarRef.dismissWithAction.bind(snackBarRef),
		};
	}


}
