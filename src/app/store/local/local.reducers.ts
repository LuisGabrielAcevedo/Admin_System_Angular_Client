import { ILocal } from './../../inferfaces/local';
import * as LocalsActions from './local.actions';
import { IApplication } from 'src/app/inferfaces/application';
import { TablePagination } from 'src/app/components/sharedComponents/table/table.interfaces';
import { ICompany } from '../../inferfaces/company';


export interface LocalState {
    locals: ILocal[];
    localsList: ILocal[];
    isLoadingLocals: boolean;
    isLoadingLocal: boolean;
    pagination: TablePagination;
}

export const initialState: LocalState = {
    locals: [],
    localsList: [],
    isLoadingLocals: false,
    isLoadingLocal: false,
    pagination: null,
};

export const getLocals = (state: LocalState) => state.locals;
export const getLocalsList = (state: LocalState) => state.localsList;
export const getIsLoadingLocals = (state: LocalState) => state.isLoadingLocals;
export const getIsLoadingLocal = (state: LocalState) => state.isLoadingLocal;
export const getPagination = (state: LocalState) => state.pagination;


export function LocalReducer(state = initialState, action: LocalsActions.Actions): LocalState {
    switch (action.type) {
        case LocalsActions.LOAD_LOCALS: {
            return Object.assign({}, state, {
                isLoadingLocals: true
            });
        }
        case LocalsActions.LOAD_LOCALS_SUCCESS: {
            return Object.assign({}, state, {
                isLoadingLocals: false,
                locals: action.payload
            });
        }
        case LocalsActions.LOAD_LOCALS_LIST: {
            return Object.assign({}, state, {
                isLoadingLocals: true
            });
        }
        case LocalsActions.LOAD_LOCALS_LIST_SUCCESS: {
            return Object.assign({}, state, {
                isLoadingLocals: false,
                localsList: action.payload
            });
        }
        case LocalsActions.SAVE_LOCAL: {
            return Object.assign({}, state, {
                isLoadingLocal: true
            });
        }
        case LocalsActions.SAVE_LOCAL_SUCCESS: {
            return Object.assign({}, state, {
                isLoadingLocal: false
            });
        }
        case LocalsActions.UPDATE_LOCAL: {
            return Object.assign({}, state, {
                isLoadingLocal: true
            });
        }
        case LocalsActions.UPDATE_LOCAL_SUCCESS: {
            return Object.assign({}, state, {
                isLoadingLocal: false
            });
        }
        case LocalsActions.DELETE_LOCAL: {
            return Object.assign({}, state, {
                isLoadingLocal: true
            });
        }
        case LocalsActions.DELETE_LOCAL_SUCCESS: {
            return Object.assign({}, state, {
                isLoadingLocal: false
            });
        }
        case LocalsActions.LOCAL_ERROR: {
            return Object.assign({}, state, {
                isLoadingLocal: false
            });
        }
        case LocalsActions.SET_PAGINATION: {
            return Object.assign({}, state, {
                pagination: action.payload
            });
        }
        case LocalsActions.RESET_LOAD_REQUEST_SUCCESS: {
            return Object.assign({}, state, {
                pagination: null
            });
        }
        default: { return state; }
    }
}

