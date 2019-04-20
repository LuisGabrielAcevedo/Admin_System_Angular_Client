import * as ProductTypesActions from './productType.actions';
import { TablePagination } from '../../components/sharedComponents/table/table.interfaces';
import { IProductType } from '../../inferfaces/productType';

export interface ProductTypeState {
    productTypes: IProductType[];
    productTypesList: IProductType[];
    isLoadingProductTypes: boolean;
    isLoadingProductType: boolean;
    pagination: TablePagination;
}

export const initialState: ProductTypeState = {
    productTypes: [],
    productTypesList: [],
    isLoadingProductTypes: false,
    isLoadingProductType: false,
    pagination: null,
};


export const getProductTypes = (state: ProductTypeState) => state.productTypes;
export const getProductTypesList = (state: ProductTypeState) => state.productTypesList;
export const getIsLoadingProductTypes = (state: ProductTypeState) => state.isLoadingProductTypes;
export const getIsLoadingProductType = (state: ProductTypeState) => state.isLoadingProductType;
export const getPagination = (state: ProductTypeState) => state.pagination;



export function ProductTypeReducer(state = initialState, action: ProductTypesActions.Actions): ProductTypeState {
    switch (action.type) {
        case ProductTypesActions.LOAD_PRODUCT_TYPES: {
            return Object.assign({}, state, {
                isLoadingProductTypes: true
            });
        }
        case ProductTypesActions.LOAD_PRODUCT_TYPES_SUCCESS: {
            return Object.assign({}, state, {
                isLoadingProductTypes: false,
                productTypes: action.payload
            });
        }
        case ProductTypesActions.LOAD_PRODUCT_TYPES_LIST: {
            return Object.assign({}, state, {
                isLoadingProductTypes: true
            });
        }
        case ProductTypesActions.LOAD_PRODUCT_TYPES_LIST_SUCCESS: {
            return Object.assign({}, state, {
                isLoadingProductTypes: false,
                productTypesList: action.payload
            });
        }
        case ProductTypesActions.SAVE_PRODUCT_TYPE: {
            return Object.assign({}, state, {
                isLoadingProductType: true
            });
        }
        case ProductTypesActions.SAVE_PRODUCT_TYPE_SUCCESS: {
            return Object.assign({}, state, {
                isLoadingProductType: false
            });
        }
        case ProductTypesActions.UPDATE_PRODUCT_TYPE: {
            return Object.assign({}, state, {
                isLoadingProductType: true
            });
        }
        case ProductTypesActions.UPDATE_PRODUCT_TYPE_SUCCESS: {
            return Object.assign({}, state, {
                isLoadingProductType: false
            });
        }
        case ProductTypesActions.DELETE_PRODUCT_TYPE: {
            return Object.assign({}, state, {
                isLoadingProductType: true
            });
        }
        case ProductTypesActions.DELETE_PRODUCT_TYPE_SUCCESS: {
            return Object.assign({}, state, {
                isLoadingProductType: false
            });
        }
        case ProductTypesActions.PRODUCT_TYPE_ERROR: {
            return Object.assign({}, state, {
                isLoadingProductType: false
            });
        }
        case ProductTypesActions.SET_PAGINATION: {
            return Object.assign({}, state, {
                pagination: action.payload
            });
        }
        default: { return state; }
    }
}
