import * as AdminSystemActions from './adminSystem.actions';
import { IApiProductType } from '../../inferfaces/apiProductType';

export interface AdminSystemState {
    apiProductTypes: IApiProductType[];
    units: string[];
    coins: string[];
    isLoadingAdminSystem: boolean;
}

export const initialState: AdminSystemState = {
    apiProductTypes: [],
    units: [],
    coins: [],
    isLoadingAdminSystem: false
};

export const getApiProductTypes = (state: AdminSystemState) => state.apiProductTypes;
export const getCoins = (state: AdminSystemState) => state.coins;
export const getUnits = (state: AdminSystemState) => state.units;
export const getLoadingAdminSystem = (state: AdminSystemState) => state.isLoadingAdminSystem;

export function AdminSystemReducer(state = initialState, action: AdminSystemActions.Actions): AdminSystemState {
    switch (action.type) {
        case AdminSystemActions.LOAD_API_PRODUCT_TYPES: {
            return Object.assign({}, state, {
                isLoadingAdminSystem: true
            });
        }
        case AdminSystemActions.LOAD_API_PRODUCT_TYPES_SUCCESS: {
            return Object.assign({}, state, {
                isLoadingAdminSystem: false,
                apiProductTypes: action.payload
            });
        }
        case AdminSystemActions.LOAD_UNITS: {
            return Object.assign({}, state, {
                isLoadingAdminSystem: true
            });
        }
        case AdminSystemActions.LOAD_UNITS_SUCCESS: {
            return Object.assign({}, state, {
                isLoadingAdminSystem: false,
                units: action.payload
            });
        }
        case AdminSystemActions.LOAD_COINS: {
            return Object.assign({}, state, {
                isLoadingAdminSystem: true
            });
        }
        case AdminSystemActions.LOAD_COINS_SUCCESS: {
            return Object.assign({}, state, {
                isLoadingAdminSystem: false,
                coins: action.payload
            });
        }
        default: { return state; }
    }
}
