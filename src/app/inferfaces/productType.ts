import { ICompany } from './company';

export interface IProductType {
    _id?: string;
    name: string;
    company: ICompany;
    apiTypeProduct: string;
    description?: string;
    createdAt?: string;
    updatedAt?: string;
}
