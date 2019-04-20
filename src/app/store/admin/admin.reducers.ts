import * as AdminsActions from './admin.actions';
import { IAdmin } from '../../inferfaces/admin';
import { TablePagination } from '../../components/sharedComponents/table/table.interfaces';

export interface AdminState {
    admins: IAdmin[];
    isLoadingAdmins: boolean;
    isLoadingAdmin: boolean;
    pagination: TablePagination;
}

export const initialState: AdminState = {
    admins: [],
    isLoadingAdmins: false,
    isLoadingAdmin: false,
    pagination: null
};

export const getAdmins = (state: AdminState) => state.admins;
export const getIsLoadingAdmins = (state: AdminState) => state.isLoadingAdmins;
export const getIsLoadingAdmin = (state: AdminState) => state.isLoadingAdmin;
export const getPagination = (state: AdminState) => state.pagination;


export function AdminReducer(state = initialState, action: AdminsActions.Actions): AdminState {
    switch (action.type) {
        case AdminsActions.LOAD_ADMINS: {
            return Object.assign({}, state, {
                isLoadingAdmins: true
            });
        }
        case AdminsActions.LOAD_ADMINS_SUCCESS: {
            return Object.assign({}, state, {
                isLoadingAdmins: false,
                admins: action.payload
            });
        }
        case AdminsActions.SAVE_ADMIN: {
            return Object.assign({}, state, {
                isLoadingAdmin: true
            });
        }
        case AdminsActions.SAVE_ADMIN_SUCCESS: {
            return Object.assign({}, state, {
                isLoadingAdmin: false
            });
        }
        case AdminsActions.UPDATE_ADMIN: {
            return Object.assign({}, state, {
                isLoadingAdmin: true
            });
        }
        case AdminsActions.UPDATE_ADMIN_SUCCESS: {
            return Object.assign({}, state, {
                isLoadingAdmin: false
            });
        }
        case AdminsActions.DELETE_ADMIN: {
            return Object.assign({}, state, {
                isLoadingAdmin: true
            });
        }
        case AdminsActions.DELETE_ADMIN_SUCCESS: {
            return Object.assign({}, state, {
                isLoadingAdmin: false
            });
        }
        case AdminsActions.ADMIN_ERROR: {
            return Object.assign({}, state, {
                isLoadingAdmin: false
            });
        }
        case AdminsActions.SET_PAGINATION: {
            return Object.assign({}, state, {
                pagination: action.payload
            });
        }
        default: { return state; }
    }
}
