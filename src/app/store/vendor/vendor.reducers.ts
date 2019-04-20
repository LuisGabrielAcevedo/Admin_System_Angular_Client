import * as VendorsActions from './vendor.actions';
import { TablePagination } from '../../components/sharedComponents/table/table.interfaces';
import { IVendor } from 'src/app/inferfaces/vendor';


export interface VendorState {
    vendors: IVendor[];
    vendorsList: IVendor[];
    isLoadingVendors: boolean;
    isLoadingVendor: boolean;
    pagination: TablePagination;
}

export const initialState: VendorState = {
    vendors: [],
    vendorsList: [],
    isLoadingVendors: false,
    isLoadingVendor: false,
    pagination: null,
};


export const getVendors = (state: VendorState) => state.vendors;
export const getVendorsList = (state: VendorState) => state.vendorsList;
export const getIsLoadingVendors = (state: VendorState) => state.isLoadingVendors;
export const getIsLoadingVendor = (state: VendorState) => state.isLoadingVendor;
export const getPagination = (state: VendorState) => state.pagination;



export function VendorReducer(state = initialState, action: VendorsActions.Actions): VendorState {
    switch (action.type) {
        case VendorsActions.LOAD_VENDORS: {
            return Object.assign({}, state, {
                isLoadingVendors: true
            });
        }
        case VendorsActions.LOAD_VENDORS_SUCCESS: {
            console.log(action.payload);
            return Object.assign({}, state, {
                isLoadingVendors: false,
                vendors: action.payload
            });
        }
        case VendorsActions.LOAD_VENDORS_LIST: {
            return Object.assign({}, state, {
                isLoadingVendors: true
            });
        }
        case VendorsActions.LOAD_VENDORS_LIST_SUCCESS: {
            return Object.assign({}, state, {
                isLoadingVendors: false,
                vendorsList: action.payload
            });
        }
        case VendorsActions.SAVE_VENDOR: {
            return Object.assign({}, state, {
                isLoadingVendor: true
            });
        }
        case VendorsActions.SAVE_VENDOR_SUCCESS: {
            return Object.assign({}, state, {
                isLoadingVendor: false
            });
        }
        case VendorsActions.UPDATE_VENDOR: {
            return Object.assign({}, state, {
                isLoadingVendor: true
            });
        }
        case VendorsActions.UPDATE_VENDOR_SUCCESS: {
            return Object.assign({}, state, {
                isLoadingVendor: false
            });
        }
        case VendorsActions.DELETE_VENDOR: {
            return Object.assign({}, state, {
                isLoadingVendor: true
            });
        }
        case VendorsActions.DELETE_VENDOR_SUCCESS: {
            return Object.assign({}, state, {
                isLoadingVendor: false
            });
        }
        case VendorsActions.VENDOR_ERROR: {
            return Object.assign({}, state, {
                isLoadingVendor: false
            });
        }
        case VendorsActions.SET_PAGINATION: {
            return Object.assign({}, state, {
                pagination: action.payload
            });
        }
        default: { return state; }
    }
}
