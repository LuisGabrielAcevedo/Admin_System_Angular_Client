import * as PermissionsActions from './permission.actions';
import { IPermission } from '../../inferfaces/permission';
import { TablePagination } from 'src/app/components/sharedComponents/table/table.interfaces';
import { IApplication } from '../../inferfaces/application';


export interface PermissionState {
    permissions: IPermission[];
    permissionsList: IPermission[];
    isLoadingPermissions: boolean;
    isLoadingPermission: boolean;
    pagination: TablePagination;
}

export const initialState: PermissionState = {
    permissions: [],
    permissionsList: [],
    isLoadingPermissions: false,
    isLoadingPermission: false,
    pagination: null
};

export const getPermissions = (state: PermissionState) => state.permissions;
export const getPermissionsList = (state: PermissionState) => state.permissionsList;
export const getIsLoadingPermissions = (state: PermissionState) => state.isLoadingPermissions;
export const getIsLoadingPermission = (state: PermissionState) => state.isLoadingPermission;
export const getPagination = (state: PermissionState) => state.pagination;


export function PermissionReducer(state = initialState, action: PermissionsActions.Actions): PermissionState {
    switch (action.type) {
        case PermissionsActions.LOAD_PERMISSIONS: {
            return Object.assign({}, state, {
                isLoadingPermissions: true
            });
        }
        case PermissionsActions.LOAD_PERMISSIONS_SUCCESS: {
            return Object.assign({}, state, {
                isLoadingPermissions: false,
                permissions: action.payload
            });
        }

        case PermissionsActions.LOAD_PERMISSIONS_LIST: {
            return Object.assign({}, state, {
                isLoadingPermissions: true
            });
        }
        case PermissionsActions.LOAD_PERMISSIONS_LIST_SUCCESS: {
            return Object.assign({}, state, {
                isLoadingPermissions: false,
                permissionsList: action.payload
            });
        }

        case PermissionsActions.SAVE_PERMISSION: {
            return Object.assign({}, state, {
                isLoadingPermission: true
            });
        }
        case PermissionsActions.SAVE_PERMISSION_SUCCESS: {
            return Object.assign({}, state, {
                isLoadingPermission: false
            });
        }
        case PermissionsActions.UPDATE_PERMISSION: {
            return Object.assign({}, state, {
                isLoadingPermission: true
            });
        }
        case PermissionsActions.UPDATE_PERMISSION_SUCCESS: {
            return Object.assign({}, state, {
                isLoadingPermission: false
            });
        }
        case PermissionsActions.DELETE_PERMISSION: {
            return Object.assign({}, state, {
                isLoadingPermission: true
            });
        }
        case PermissionsActions.DELETE_PERMISSION_SUCCESS: {
            return Object.assign({}, state, {
                isLoadingPermission: false
            });
        }
        case PermissionsActions.PERMISSION_ERROR: {
            return Object.assign({}, state, {
                isLoadingPermission: false
            });
        }
        case PermissionsActions.SET_PAGINATION: {
            return Object.assign({}, state, {
                pagination: action.payload
            });
        }
        case PermissionsActions.RESET_LOAD_REQUEST_SUCCESS: {
            return Object.assign({}, state, {
                pagination: null
            });
        }
        default: { return state; }
    }
}
