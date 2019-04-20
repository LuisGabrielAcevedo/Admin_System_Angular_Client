import { IApplication } from './../../inferfaces/application';
import * as ApplicationActions from './application.actions';
import { TablePagination } from 'src/app/components/sharedComponents/table/table.interfaces';


export interface ApplicationState {
    applications: IApplication[];
    applicationsList: IApplication[];
    isLoadingApplications: boolean;
    isLoadingApplication: boolean;
    pagination: TablePagination;
}

export const initialState: ApplicationState = {
    applications: [],
    applicationsList: [],
    isLoadingApplications: false,
    isLoadingApplication: false,
    pagination: null
};

export const getApplications = (state: ApplicationState) => state.applications;
export const getApplicationsList = (state: ApplicationState) => state.applicationsList;
export const getIsLoadingApplications = (state: ApplicationState) => state.isLoadingApplications;
export const getIsLoadingApplication = (state: ApplicationState) => state.isLoadingApplication;
export const getPagination = (state: ApplicationState) => state.pagination;


export function ApplicationReducer(state = initialState, action: ApplicationActions.Actions): ApplicationState {
    switch (action.type) {
        case ApplicationActions.LOAD_APPLICATIONS: {
            return Object.assign({}, state, {
                isLoadingApplications: true
            });
        }
        case ApplicationActions.LOAD_APPLICATIONS_SUCCESS: {
            return Object.assign({}, state, {
                isLoadingApplications: false,
                applications: action.payload
            });
        }
        case ApplicationActions.LOAD_APPLICATIONS_LIST: {
            return Object.assign({}, state, {
                isLoadingApplications: true
            });
        }
        case ApplicationActions.LOAD_APPLICATIONS_LIST_SUCCESS: {
            return Object.assign({}, state, {
                isLoadingApplications: false,
                applicationsList: action.payload
            });
        }
        case ApplicationActions.SAVE_APPLICATION: {
            return Object.assign({}, state, {
                isLoadingApplication: true
            });
        }
        case ApplicationActions.SAVE_APPLICATION_SUCCESS: {
            return Object.assign({}, state, {
                isLoadingApplication: false
            });
        }
        case ApplicationActions.UPDATE_APPLICATION: {
            return Object.assign({}, state, {
                isLoadingApplication: true
            });
        }
        case ApplicationActions.UPDATE_APPLICATION_SUCCESS: {
            return Object.assign({}, state, {
                isLoadingApplication: false
            });
        }
        case ApplicationActions.DELETE_APPLICATION: {
            return Object.assign({}, state, {
                isLoadingApplication: true
            });
        }
        case ApplicationActions.DELETE_APPLICATION_SUCCESS: {
            return Object.assign({}, state, {
                isLoadingApplication: false
            });
        }
        case ApplicationActions.APPLICATION_ERROR: {
            return Object.assign({}, state, {
                isLoadingApplication: false
            });
        }
        case ApplicationActions.SET_PAGINATION: {
            return Object.assign({}, state, {
                pagination: action.payload
            });
        }
        default: { return state; }
    }
}
