import { ILicense } from './../../inferfaces/license';
import * as LicensesActions from './license.actions';
import { TablePagination } from 'src/app/components/sharedComponents/table/table.interfaces';

export interface LicenseState {
    licenses: ILicense[];
    isLoadingLicenses: boolean;
    isLoadingLicense: boolean;
    pagination: TablePagination;
}

export const initialState: LicenseState = {
    licenses: [],
    isLoadingLicenses: false,
    isLoadingLicense: false,
    pagination: null
};

export const getLicenses = (state: LicenseState) => state.licenses;
export const getIsLoadingLicenses = (state: LicenseState) => state.isLoadingLicenses;
export const getIsLoadingLicense = (state: LicenseState) => state.isLoadingLicense;
export const getPagination = (state: LicenseState) => state.pagination;

export function LicenseReducer(state = initialState, action: LicensesActions.Actions): LicenseState {
    switch (action.type) {
        case LicensesActions.LOAD_LICENSES: {
            return Object.assign({}, state, {
                isLoadingLicenses: true
            });
        }
        case LicensesActions.LOAD_LICENSES_SUCCESS: {
            return Object.assign({}, state, {
                isLoadingLicenses: false,
                licenses: action.payload
            });
        }
        case LicensesActions.SAVE_LICENSE: {
            return Object.assign({}, state, {
                isLoadingLicense: true
            });
        }
        case LicensesActions.SAVE_LICENSE_SUCCESS: {
            return Object.assign({}, state, {
                isLoadingLicense: false
            });
        }
        case LicensesActions.UPDATE_LICENSE: {
            return Object.assign({}, state, {
                isLoadingLicense: true
            });
        }
        case LicensesActions.UPDATE_LICENSE_SUCCESS: {
            return Object.assign({}, state, {
                isLoadingLicense: false
            });
        }
        case LicensesActions.DELETE_LICENSE: {
            return Object.assign({}, state, {
                isLoadingLicense: true
            });
        }
        case LicensesActions.DELETE_LICENSE_SUCCESS: {
            return Object.assign({}, state, {
                isLoadingLicense: false
            });
        }
        case LicensesActions.LICENSE_ERROR: {
            return Object.assign({}, state, {
                isLoadingLicense: false
            });
        }
        case LicensesActions.SET_PAGINATION: {
            return Object.assign({}, state, {
                pagination: action.payload
            });
        }
        default: { return state; }
    }
}
