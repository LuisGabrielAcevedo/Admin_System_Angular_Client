import { Action } from '@ngrx/store';
import { IRequestEvent } from 'src/app/inferfaces/app-settings/loading';

export const APP_SETTINGS_ADD_LOADING = '[App settings] App Settings Add Loading';
export const APP_SETTINGS_REMOVE_LOADING = '[App settings] App Settings Remove Loading';

export class AddLoadingAction implements Action {
    readonly type = APP_SETTINGS_ADD_LOADING;
    constructor(public payload: IRequestEvent) { }
}

export class RemoveLoadingAction implements Action {
    readonly type = APP_SETTINGS_REMOVE_LOADING;
    constructor(public payload: string) { }
}

export type Actions
    = AddLoadingAction
    | RemoveLoadingAction;
