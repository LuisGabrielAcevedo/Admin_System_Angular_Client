import { IApplication } from './application';
import { ICompany } from './company';

export interface ILocal {
    _id?: string;
    name: string;
    description?: string;
    company: ICompany;
    application: IApplication;
    createAt?: string;
    updateAt?: string;
    address?: string;
}


