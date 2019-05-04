import { IApplication } from './application';
import { ICompany } from './company';
import { ICountry } from './country';
import { ILicense } from './license';

export interface ILocal {
    _id?: string;
    name: string;
    description?: string;
    address?: string;
    phone?: string;
    company: ICompany;
    application: IApplication;
    storeConfigurations: IStoreConfigurations;
    country: ICountry;
    city: string;
    fax: string;
    license: ILicense;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
}

export interface IStoreConfigurations {
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
}


