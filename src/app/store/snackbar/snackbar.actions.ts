import { Action } from '@ngrx/store';
import { ISnackbarMessage } from '../../inferfaces/snackbar';

export const SEND_MESSAGE = '[Snackbar] Send Message';

export class SendMessageAction implements Action {
    readonly type = SEND_MESSAGE;
    constructor(public payload: ISnackbarMessage) {
    }
}

export type Actions
    = SendMessageAction;

