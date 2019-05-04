import { ICompany } from './company';
import { IImage } from 'src/app/inferfaces/images';
import { IApplication } from './application';
import { IInformation } from 'src/app/inferfaces/information';

export interface ICustomer {
    _id?: string;
    email: string;
    firstName: string;
    lastName: string;
    company?: ICompany;
    application?: IApplication;
    phone?: string;
    cellPhone?: string;
    profileImage?: IImage;
    isActive?: boolean;
    customerInformation?: IInformation;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
}
