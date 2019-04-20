import * as ProductCategoriesActions from './productCategory.actions';
import { TablePagination } from '../../components/sharedComponents/table/table.interfaces';
import { IProductCategory } from '../../inferfaces/productCategory';

export interface ProductCategoryState {
    productCategories: IProductCategory[];
    productCategoriesList: IProductCategory[];
    isLoadingProductCategories: boolean;
    isLoadingProductCategory: boolean;
    pagination: TablePagination;
}

export const initialState: ProductCategoryState = {
    productCategories: [],
    productCategoriesList: [],
    isLoadingProductCategories: false,
    isLoadingProductCategory: false,
    pagination: null,
};


export const getProductCategories = (state: ProductCategoryState) => state.productCategories;
export const getProductCategoriesList = (state: ProductCategoryState) => state.productCategoriesList;
export const getIsLoadingProductCategories = (state: ProductCategoryState) => state.isLoadingProductCategories;
export const getIsLoadingProductCategory = (state: ProductCategoryState) => state.isLoadingProductCategory;
export const getPagination = (state: ProductCategoryState) => state.pagination;



export function ProductCategoryReducer(state = initialState, action: ProductCategoriesActions.Actions): ProductCategoryState {
    switch (action.type) {
        case ProductCategoriesActions.LOAD_PRODUCT_CATEGORIES: {
            return Object.assign({}, state, {
                isLoadingProductCategories: true
            });
        }
        case ProductCategoriesActions.LOAD_PRODUCT_CATEGORIES_SUCCESS: {
            return Object.assign({}, state, {
                isLoadingProductCategories: false,
                productCategories: action.payload
            });
        }
        case ProductCategoriesActions.LOAD_PRODUCT_CATEGORIES_LIST: {
            return Object.assign({}, state, {
                isLoadingProductCategories: true
            });
        }
        case ProductCategoriesActions.LOAD_PRODUCT_CATEGORIES_LIST_SUCCESS: {
            return Object.assign({}, state, {
                isLoadingProductCategories: false,
                productCategoriesList: action.payload
            });
        }
        case ProductCategoriesActions.SAVE_PRODUCT_CATEGORY: {
            return Object.assign({}, state, {
                isLoadingProductCategory: true
            });
        }
        case ProductCategoriesActions.SAVE_PRODUCT_CATEGORY_SUCCESS: {
            return Object.assign({}, state, {
                isLoadingProductCategory: false
            });
        }
        case ProductCategoriesActions.UPDATE_PRODUCT_CATEGORY: {
            return Object.assign({}, state, {
                isLoadingProductCategory: true
            });
        }
        case ProductCategoriesActions.UPDATE_PRODUCT_CATEGORY_SUCCESS: {
            return Object.assign({}, state, {
                isLoadingProductCategory: false
            });
        }
        case ProductCategoriesActions.DELETE_PRODUCT_CATEGORY: {
            return Object.assign({}, state, {
                isLoadingProductCategory: true
            });
        }
        case ProductCategoriesActions.DELETE_PRODUCT_CATEGORY_SUCCESS: {
            return Object.assign({}, state, {
                isLoadingProductCategory: false
            });
        }
        case ProductCategoriesActions.PRODUCT_CATEGORY_ERROR: {
            return Object.assign({}, state, {
                isLoadingProductCategory: false
            });
        }
        case ProductCategoriesActions.SET_PAGINATION: {
            return Object.assign({}, state, {
                pagination: action.payload
            });
        }
        default: { return state; }
    }
}
