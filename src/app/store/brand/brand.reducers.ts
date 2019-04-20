import * as BrandsActions from './brand.actions';
import { TablePagination } from '../../components/sharedComponents/table/table.interfaces';
import { IBrand } from '../../inferfaces/brand';

export interface BrandState {
    brands: IBrand[];
    brandsList: IBrand[];
    isLoadingBrands: boolean;
    isLoadingBrand: boolean;
    pagination: TablePagination;
}

export const initialState: BrandState = {
    brands: [],
    brandsList: [],
    isLoadingBrands: false,
    isLoadingBrand: false,
    pagination: null,
};


export const getBrands = (state: BrandState) => state.brands;
export const getBrandsList = (state: BrandState) => state.brandsList;
export const getIsLoadingBrands = (state: BrandState) => state.isLoadingBrands;
export const getIsLoadingBrand = (state: BrandState) => state.isLoadingBrand;
export const getPagination = (state: BrandState) => state.pagination;



export function BrandReducer(state = initialState, action: BrandsActions.Actions): BrandState {
    switch (action.type) {
        case BrandsActions.LOAD_BRANDS: {
            return Object.assign({}, state, {
                isLoadingBrands: true
            });
        }
        case BrandsActions.LOAD_BRANDS_SUCCESS: {
            return Object.assign({}, state, {
                isLoadingBrands: false,
                brands: action.payload
            });
        }
        case BrandsActions.LOAD_BRANDS_LIST: {
            return Object.assign({}, state, {
                isLoadingBrands: true
            });
        }
        case BrandsActions.LOAD_BRANDS_LIST_SUCCESS: {
            return Object.assign({}, state, {
                isLoadingBrands: false,
                brandsList: action.payload
            });
        }
        case BrandsActions.SAVE_BRAND: {
            return Object.assign({}, state, {
                isLoadingBrand: true
            });
        }
        case BrandsActions.SAVE_BRAND_SUCCESS: {
            return Object.assign({}, state, {
                isLoadingBrand: false
            });
        }
        case BrandsActions.UPDATE_BRAND: {
            return Object.assign({}, state, {
                isLoadingBrand: true
            });
        }
        case BrandsActions.UPDATE_BRAND_SUCCESS: {
            return Object.assign({}, state, {
                isLoadingBrand: false
            });
        }
        case BrandsActions.DELETE_BRAND: {
            return Object.assign({}, state, {
                isLoadingBrand: true
            });
        }
        case BrandsActions.DELETE_BRAND_SUCCESS: {
            return Object.assign({}, state, {
                isLoadingBrand: false
            });
        }
        case BrandsActions.BRAND_ERROR: {
            return Object.assign({}, state, {
                isLoadingBrand: false
            });
        }
        case BrandsActions.SET_PAGINATION: {
            return Object.assign({}, state, {
                pagination: action.payload
            });
        }
        default: { return state; }
    }
}
