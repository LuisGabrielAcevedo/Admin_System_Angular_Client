import { ICompany } from 'src/app/inferfaces/company';
import { IAdmin } from './admin';

export interface ILicense {
    _id?: string;
    code: string;
    company: ICompany;
    admin?: IAdmin;
    createdAt?: string;
    updatedAt?: string;
    expirateAt: string;
}




