import { ICompany } from './../../inferfaces/company';
import * as CompaniesActions from './company.actions';
import { TablePagination } from 'src/app/components/sharedComponents/table/table.interfaces';

export interface CompanyState {
    companies: ICompany[];
    companiesList: ICompany[];
    isLoadingCompanies: boolean;
    isLoadingCompany: boolean;
    pagination: TablePagination;
}

export const initialState: CompanyState = {
    companies: [],
    companiesList: [],
    isLoadingCompanies: false,
    isLoadingCompany: false,
    pagination: null,
};


export const getCompanies = (state: CompanyState) => state.companies;
export const getCompaniesList = (state: CompanyState) => state.companiesList;
export const getIsLoadingCompanies = (state: CompanyState) => state.isLoadingCompanies;
export const getIsLoadingCompany = (state: CompanyState) => state.isLoadingCompany;
export const getPagination = (state: CompanyState) => state.pagination;



export function CompanyReducer(state = initialState, action: CompaniesActions.Actions): CompanyState {
    switch (action.type) {
        case CompaniesActions.LOAD_COMPANIES: {
            return Object.assign({}, state, {
                isLoadingCompanies: true
            });
        }
        case CompaniesActions.LOAD_COMPANIES_SUCCESS: {
            return Object.assign({}, state, {
                isLoadingCompanies: false,
                companies: action.payload
            });
        }
        case CompaniesActions.LOAD_COMPANIES_LIST: {
            return Object.assign({}, state, {
                isLoadingCompanies: true
            });
        }
        case CompaniesActions.LOAD_COMPANIES_LIST_SUCCESS: {
            return Object.assign({}, state, {
                isLoadingCompanies: false,
                companiesList: action.payload
            });
        }
        case CompaniesActions.SAVE_COMPANY: {
            return Object.assign({}, state, {
                isLoadingCompany: true
            });
        }
        case CompaniesActions.SAVE_COMPANY_SUCCESS: {
            return Object.assign({}, state, {
                isLoadingCompany: false
            });
        }
        case CompaniesActions.UPDATE_COMPANY: {
            return Object.assign({}, state, {
                isLoadingCompany: true
            });
        }
        case CompaniesActions.UPDATE_COMPANY_SUCCESS: {
            return Object.assign({}, state, {
                isLoadingCompany: false
            });
        }
        case CompaniesActions.DELETE_COMPANY: {
            return Object.assign({}, state, {
                isLoadingCompany: true
            });
        }
        case CompaniesActions.DELETE_COMPANY_SUCCESS: {
            return Object.assign({}, state, {
                isLoadingCompany: false
            });
        }
        case CompaniesActions.COMPANY_ERROR: {
            return Object.assign({}, state, {
                isLoadingCompany: false
            });
        }
        case CompaniesActions.SET_PAGINATION: {
            return Object.assign({}, state, {
                pagination: action.payload
            });
        }
        default: { return state; }
    }
}
