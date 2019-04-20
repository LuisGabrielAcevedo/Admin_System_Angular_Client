import { ILocal } from './local';
import { IApplication } from './application';
import { ICompany } from './company';
import { IPermission } from './permission';


export interface IRole {
    _id?: string;
    name: string;
    description: string;
    company: ICompany;
    application: IApplication;
    createAt?: string;
    updateAt?: string;
    permissions: IPermission[];
    locals: ILocal[];
}


