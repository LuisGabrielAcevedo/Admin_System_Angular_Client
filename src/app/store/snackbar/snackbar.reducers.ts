import * as SnackbarActions from './snackbar.actions';
import { ISnackbarMessage } from '../../inferfaces/snackbar';

export interface SnackbarState {
    newMessage: ISnackbarMessage;
}

export const initialState: SnackbarState = {
    newMessage: null
};

export const getNewMessage = (state: SnackbarState) => state.newMessage;

export function SnackbarReducer(state = initialState, action: SnackbarActions.Actions): SnackbarState {
    switch (action.type) {
        case SnackbarActions.SEND_MESSAGE: {
            return Object.assign({}, state, {
                newMessage: action.payload
            });
        }
        default: { return state; }
    }
}
