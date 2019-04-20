import { IApplication } from './application';

export interface IPermission {
    _id?: string;
    name: string;
    description?: string;
    module?: string;
    createAt?: string;
    updateAt?: string;
    pinCodeRequired?: boolean;
    applications?: IApplication[];
}

