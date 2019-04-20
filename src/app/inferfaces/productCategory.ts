import { ICompany } from './company';

export interface IProductCategory {
    _id?: string;
    name: string;
    company: ICompany;
    description?: string;
    createdAt?: string;
    updatedAt?: string;
}
