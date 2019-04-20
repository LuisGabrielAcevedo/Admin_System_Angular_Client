import { ICompany } from './company';

export interface IVendor {
    _id?: string;
    vendorName: string;
    companyName: string;
    email: string;
    phone1?: string | null;
    phone2?: string | null;
    createdBy: ICompany;
    createdAt?: string | null;
    updatedAt?: string | null;

}









