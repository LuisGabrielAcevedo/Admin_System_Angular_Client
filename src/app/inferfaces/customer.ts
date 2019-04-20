import { ICompany } from './company';
import { IImage } from 'src/app/inferfaces/images';

export interface ICustomer {
    _id?: string;
    email: string;
    firstName: string;
    lastName: string;
    createAt?: string;
    updateAt?: string;
    phone?: string;
    status?: string;
    statusAt?: string;
    documentType?: string;
    documentNumber?: string;
    company?: ICompany;
    profileImage?: IImage;

}
