import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as SnackbarActions from '../store/snackbar/snackbar.actions';
import * as fromRoot from '../store/index.store';
import { ISnackbarMessage } from '../inferfaces/snackbar';


@Injectable()
export class SnackbarSandbox {
    constructor(protected store: Store<fromRoot.State>) {
    }
    fetchNewMessage(): Observable<ISnackbarMessage> {
        return this.store.select(fromRoot.getNewMessage);
    }
    sendMessage(message: ISnackbarMessage): void {
        this.store.dispatch(new SnackbarActions.SendMessageAction(message));
    }
}
