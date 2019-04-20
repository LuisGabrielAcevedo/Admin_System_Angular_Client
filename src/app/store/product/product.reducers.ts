import * as ProductActions from './product.actions';
import { TablePagination } from '../../components/sharedComponents/table/table.interfaces';
import { IProduct } from '../../inferfaces/product';

export interface ProductState {
    products: IProduct[];
    productsList: IProduct[];
    isLoadingProducts: boolean;
    isLoadingProduct: boolean;
    pagination: TablePagination;
}

export const initialState: ProductState = {
    products: [],
    productsList: [],
    isLoadingProducts: false,
    isLoadingProduct: false,
    pagination: null,
};


export const getProducts = (state: ProductState) => state.products;
export const getProductsList = (state: ProductState) => state.productsList;
export const getIsLoadingProducts = (state: ProductState) => state.isLoadingProducts;
export const getIsLoadingProduct = (state: ProductState) => state.isLoadingProduct;
export const getPagination = (state: ProductState) => state.pagination;



export function ProductReducer(state = initialState, action: ProductActions.Actions): ProductState {
    switch (action.type) {
        case ProductActions.LOAD_PRODUCTS: {
            return Object.assign({}, state, {
                isLoadingProducts: true
            });
        }
        case ProductActions.LOAD_PRODUCTS_SUCCESS: {
            return Object.assign({}, state, {
                isLoadingProducts: false,
                products: action.payload
            });
        }
        case ProductActions.LOAD_PRODUCTS_LIST: {
            return Object.assign({}, state, {
                isLoadingProducts: true
            });
        }
        case ProductActions.LOAD_PRODUCTS_LIST_SUCCESS: {
            return Object.assign({}, state, {
                isLoadingProducts: false,
                productsList: action.payload
            });
        }
        case ProductActions.SAVE_PRODUCT: {
            return Object.assign({}, state, {
                isLoadingProduct: true
            });
        }
        case ProductActions.SAVE_PRODUCT_SUCCESS: {
            return Object.assign({}, state, {
                isLoadingProduct: false
            });
        }
        case ProductActions.UPDATE_PRODUCT: {
            return Object.assign({}, state, {
                isLoadingProduct: true
            });
        }
        case ProductActions.UPDATE_PRODUCT_SUCCESS: {
            return Object.assign({}, state, {
                isLoadingProduct: false
            });
        }
        case ProductActions.DELETE_PRODUCT: {
            return Object.assign({}, state, {
                isLoadingProduct: true
            });
        }
        case ProductActions.DELETE_PRODUCT_SUCCESS: {
            return Object.assign({}, state, {
                isLoadingProduct: false
            });
        }
        case ProductActions.PRODUCT_ERROR: {
            return Object.assign({}, state, {
                isLoadingProduct: false
            });
        }
        case ProductActions.SET_PAGINATION: {
            return Object.assign({}, state, {
                pagination: action.payload
            });
        }
        default: { return state; }
    }
}
