import { IImage } from './images';
import { IRole } from './role';
import { ICompany } from './company';
import { IApplication } from './application';

export interface IUser {
    _id?: string;
    email: string;
    password: string;
    userName?: string | null;
    firstName: string;
    lastName: string;
    createAt?: string | null;
    updateAt?: string | null;
    documentType?: string | null;
    documentNumber?: string | null;
    rol: IRole;
    company: ICompany;
    application: IApplication;
    language?: string | null;
    profileImage?: IImage;
    isActive?: boolean;
}
