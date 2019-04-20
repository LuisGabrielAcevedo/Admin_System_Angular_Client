import { Action } from '@ngrx/store';
import { IApiProductType } from 'src/app/inferfaces/apiProductType';

export const LOAD_API_PRODUCT_TYPES = '[Admin System] Load ApiProductTypes';
export const LOAD_API_PRODUCT_TYPES_SUCCESS = '[Admin System] Load ApiProductTypes Succces';

export const LOAD_UNITS = '[Admin System] Load Units';
export const LOAD_UNITS_SUCCESS = '[Admin System] Load Units Succces';

export const LOAD_COINS = '[Admin System] Load Coins';
export const LOAD_COINS_SUCCESS = '[Admin System] Load Coins Succces';

export class LoadApiProductTypesAction implements Action {
    readonly type = LOAD_API_PRODUCT_TYPES;
    constructor() {
    }
}

export class LoadApiProductTypesSuccessAction implements Action {
    readonly type = LOAD_API_PRODUCT_TYPES_SUCCESS;
    constructor(public payload: IApiProductType[]) {}
}

export class LoadUnitsAction implements Action {
    readonly type = LOAD_UNITS;
    constructor() {
    }
}

export class LoadUnitsSuccessAction implements Action {
    readonly type = LOAD_UNITS_SUCCESS;
    constructor(public payload: string[]) {}
}

export class LoadCoinsAction implements Action {
    readonly type = LOAD_COINS;
    constructor() {
    }
}

export class LoadCoinsSuccessAction implements Action {
    readonly type = LOAD_COINS_SUCCESS;
    constructor(public payload: string[]) {}
}

export type Actions
    = LoadApiProductTypesAction
    | LoadApiProductTypesSuccessAction
    | LoadUnitsAction
    | LoadUnitsSuccessAction
    | LoadCoinsAction
    | LoadCoinsSuccessAction;

