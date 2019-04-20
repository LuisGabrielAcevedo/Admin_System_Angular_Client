import { ICountry } from './../../inferfaces/country';
import * as CountryActions from './country.actions';
import { TablePagination } from 'src/app/components/sharedComponents/table/table.interfaces';



export interface CountryState {
    countries: ICountry[];
    countriesList: ICountry[];
    isLoadingCountries: boolean;
    isLoadingCountry: boolean;
    pagination: TablePagination;
}

export const initialState: CountryState = {
    countries: [],
    countriesList: [],
    isLoadingCountries: false,
    isLoadingCountry: false,
    pagination: null,
};

export const getCountries = (state: CountryState) => state.countries;
export const getCountriesList = (state: CountryState) => state.countriesList;
export const getIsLoadingCountries = (state: CountryState) => state.isLoadingCountries;
export const getIsLoadingCountry = (state: CountryState) => state.isLoadingCountry;
export const getPagination = (state: CountryState) => state.pagination;

export function CountryReducer(state = initialState, action: CountryActions.Actions): CountryState {
    switch (action.type) {
        case CountryActions.LOAD_COUNTRIES: {
            return Object.assign({}, state, {
                isLoadingCountries: true
            });
        }
        case CountryActions.LOAD_COUNTRIES_SUCCESS: {
            return Object.assign({}, state, {
                isLoadingCountries: false,
                countries: action.payload
            });
        }
        case CountryActions.LOAD_COUNTRIES_LIST: {
            return Object.assign({}, state, {
                isLoadingCountries: true
            });
        }
        case CountryActions.LOAD_COUNTRIES_LIST_SUCCESS: {
            return Object.assign({}, state, {
                isLoadingCountries: false,
                countriesList: action.payload
            });
        }
        case CountryActions.SAVE_COUNTRY: {
            return Object.assign({}, state, {
                isLoadingCountry: true
            });
        }
        case CountryActions.SAVE_COUNTRY_SUCCESS: {
            return Object.assign({}, state, {
                isLoadingCountry: false
            });
        }
        case CountryActions.UPDATE_COUNTRY: {
            return Object.assign({}, state, {
                isLoadingCountry: true
            });
        }
        case CountryActions.UPDATE_COUNTRY_SUCCESS: {
            return Object.assign({}, state, {
                isLoadingCountry: false
            });
        }
        case CountryActions.DELETE_COUNTRY: {
            return Object.assign({}, state, {
                isLoadingCountry: true
            });
        }
        case CountryActions.DELETE_COUNTRY_SUCCESS: {
            return Object.assign({}, state, {
                isLoadingCountry: false
            });
        }
        case CountryActions.COUNTRY_ERROR: {
            return Object.assign({}, state, {
                isLoadingCountry: false
            });
        }
        case CountryActions.SET_PAGINATION: {
            return Object.assign({}, state, {
                pagination: action.payload
            });
        }
        default: { return state; }
    }
}

