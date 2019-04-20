import * as RolesActions from './role.actions';
import { IRole } from '../../inferfaces/role';
import { TablePagination } from 'src/app/components/sharedComponents/table/table.interfaces';


export interface RoleState {
    roles: IRole[];
    rolesList: IRole[];
    isLoadingRoles: boolean;
    isLoadingRole: boolean;
    pagination: TablePagination;
}


export const initialState: RoleState = {
    roles: [],
    rolesList: [],
    isLoadingRoles: false,
    isLoadingRole: false,
    pagination: null,
};

export const getRoles = (state: RoleState) => state.roles;
export const getRolesList = (state: RoleState) => state.rolesList;
export const getIsLoadingRoles = (state: RoleState) => state.isLoadingRoles;
export const getIsLoadingRole = (state: RoleState) => state.isLoadingRole;
export const getPagination = (state: RoleState) => state.pagination;



export function RoleReducer(state = initialState, action: RolesActions.Actions): RoleState {
    switch (action.type) {
        case RolesActions.LOAD_ROLES: {
            return Object.assign({}, state, {
                isLoadingRoles: true
            });
        }
        case RolesActions.LOAD_ROLES_SUCCESS: {
            return Object.assign({}, state, {
                isLoadingRoles: false,
                roles: action.payload
            });
        }
        case RolesActions.LOAD_ROLES_LIST: {
            return Object.assign({}, state, {
                isLoadingRoles: true
            });
        }
        case RolesActions.LOAD_ROLES_LIST_SUCCESS: {
            return Object.assign({}, state, {
                isLoadingRoles: false,
                rolesList: action.payload
            });
        }
        case RolesActions.SAVE_ROLE: {
            return Object.assign({}, state, {
                isLoadingRole: true
            });
        }
        case RolesActions.SAVE_ROLE_SUCCESS: {
            return Object.assign({}, state, {
                isLoadingRole: false
            });
        }
        case RolesActions.UPDATE_ROLE: {
            return Object.assign({}, state, {
                isLoadingRole: true
            });
        }
        case RolesActions.UPDATE_ROLE_SUCCESS: {
            return Object.assign({}, state, {
                isLoadingRole: false
            });
        }
        case RolesActions.DELETE_ROLE: {
            return Object.assign({}, state, {
                isLoadingRole: true
            });
        }
        case RolesActions.DELETE_ROLE_SUCCESS: {
            return Object.assign({}, state, {
                isLoadingRole: false
            });
        }
        case RolesActions.ROLE_ERROR: {
            return Object.assign({}, state, {
                isLoadingRole: false
            });
        }
        case RolesActions.SET_PAGINATION: {
            return Object.assign({}, state, {
                pagination: action.payload
            });
        }
        case RolesActions.RESET_LOAD_REQUEST_SUCCESS: {
            return Object.assign({}, state, {
                pagination: null
            });
        }
        default: { return state; }
    }
}
