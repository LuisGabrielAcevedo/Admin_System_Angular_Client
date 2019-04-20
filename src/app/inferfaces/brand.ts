import { ICompany } from './company';

export interface IBrand {
    _id?: string;
    name: string;
    company: ICompany;
    createdAt?: string;
    updatedAt?: string;
}
