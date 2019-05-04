import { IImage } from './images';
import { IRole } from './role';
import { ICompany } from './company';
import { IApplication } from './application';
import { IInformation } from 'src/app/inferfaces/information';

export interface IUser {
    _id?: string;
    email: string;
    password: string;
    userName?: string | null;
    firstName: string;
    lastName: string;
    createAt?: string | null;
    updateAt?: string | null;
    deletedAt?: string | null;
    ApplicationRole: string;
    token: string;
    role: IRole;
    company: ICompany;
    application: IApplication;
    profileImage?: IImage;
    isActive?: boolean;
    userConfigurations:IUserConfiguration;
    userInformation: IInformation;
}

export interface IUserConfiguration {
    language: string;
    currentStore: string;
    paletteSelected: number;
}