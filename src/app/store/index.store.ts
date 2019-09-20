import { createSelector } from 'reselect';
import { ActionReducerMap } from '@ngrx/store';

import * as fromAdmin from './admin/admin.reducers';
import * as fromCustomer from './customer/customer.reducers';
import * as fromLicense from './license/license.reducers';
import * as fromUser from './user/user.reducers';
import * as fromRole from './role/role.reducers';
import * as fromPermission from './permission/permission.reducers';
import * as fromSnackbar from './snackbar/snackbar.reducers';
import * as fromAuthUser from './auth/auth.reducers';


export interface State {
    admin: fromAdmin.AdminState;
    customer: fromCustomer.CustomerState;
    license: fromLicense.LicenseState;
    user: fromUser.UserState;
    role: fromRole.RoleState;
    permission: fromPermission.PermissionState;
    snackbar: fromSnackbar.SnackbarState;
    auth: fromAuthUser.UserState;

}

export const reducers: ActionReducerMap<State> = {
    admin: fromAdmin.AdminReducer,
    customer: fromCustomer.CustomerReducer,
    license: fromLicense.LicenseReducer,
    user: fromUser.UserReducer,
    role: fromRole.RoleReducer,
    permission: fromPermission.PermissionReducer,
    snackbar: fromSnackbar.SnackbarReducer,
    auth: fromAuthUser.AuthReducer
};

export const getUserState = (state: State) => state.user;
export const getAdminState = (state: State) => state.admin;
export const getLicenseState = (state: State) => state.license;
export const getCustomerState = (state: State) => state.customer;
export const getRoleState = (state: State) => state.role;
export const getPermissionState = (state: State) => state.permission;
export const getSnackbarState = (state: State) => state.snackbar;
export const getAuthState = (state: State) => state.auth;

// Auth Selectors
export const getUser = createSelector(getAuthState, fromAuthUser.getUser);
export const getIsLogged = createSelector(getAuthState, fromAuthUser.getIsLogged);
export const getToken = createSelector(getAuthState, fromAuthUser.getToken);
export const getRole = createSelector(getAuthState, fromAuthUser.getRole);
export const getIsLoadingAuth = createSelector(getAuthState, fromAuthUser.getIsLoading);

// User selectors
export const getUsers = createSelector(getUserState, fromUser.getUsers);
export const getUsersList = createSelector(getUserState, fromUser.getUsersList);
export const getIsLoadingUsers = createSelector(getUserState, fromUser.getIsLoadingUsers);
export const getIsLoadingUser = createSelector(getUserState, fromUser.getIsLoadingUser);
export const getPaginationUser = createSelector(getUserState, fromUser.getPagination);

// Admin selectors
export const getAdmins = createSelector(getAdminState, fromAdmin.getAdmins);
export const getIsLoadingAdmins = createSelector(getAdminState, fromAdmin.getIsLoadingAdmins);
export const getIsLoadingAdmin = createSelector(getAdminState, fromAdmin.getIsLoadingAdmin);
export const getPaginationAdmin = createSelector(getAdminState, fromAdmin.getPagination);

// License selectors
export const getLicenses = createSelector(getLicenseState, fromLicense.getLicenses);
export const getIsLoadingLicenses = createSelector(getLicenseState, fromLicense.getIsLoadingLicenses);
export const getIsLoadingLicense = createSelector(getLicenseState, fromLicense.getIsLoadingLicense);
export const getPaginationLicense = createSelector(getLicenseState, fromLicense.getPagination);

// Customer selectors
export const getCustomers = createSelector(getCustomerState, fromCustomer.getCustomers);
export const getIsLoadingCustomers = createSelector(getCustomerState, fromCustomer.getIsLoadingCustomers);
export const getIsLoadingCustomer = createSelector(getCustomerState, fromCustomer.getIsLoadingCustomer);
export const getPaginationCustomer = createSelector(getCustomerState, fromCustomer.getPagination);

// Role selectors
export const getRoles = createSelector(getRoleState, fromRole.getRoles);
export const getRolesList = createSelector(getRoleState, fromRole.getRolesList);
export const getIsLoadingRoles = createSelector(getRoleState, fromRole.getIsLoadingRoles);
export const getIsLoadingRole = createSelector(getRoleState, fromRole.getIsLoadingRole);
export const getPaginationRole = createSelector(getRoleState, fromRole.getPagination);

// Permission selectors
export const getPermissions = createSelector(getPermissionState, fromPermission.getPermissions);
export const getPermissionsList = createSelector(getPermissionState, fromPermission.getPermissionsList);
export const getIsLoadingPermissions = createSelector(getPermissionState, fromPermission.getIsLoadingPermissions);
export const getIsLoadingPermission = createSelector(getPermissionState, fromPermission.getIsLoadingPermission);
export const getPaginationPermission = createSelector(getPermissionState, fromPermission.getPagination);

// Snackbar selectors
export const getNewMessage = createSelector(getSnackbarState, fromSnackbar.getNewMessage);

