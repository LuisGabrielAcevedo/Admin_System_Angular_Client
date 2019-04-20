import { IImage } from 'src/app/inferfaces/images';
import { IApplication } from './application';
import { IUser } from './user';
import { ICountry } from './country';

export interface ICompany {
    _id?: string;
    name: string;
    country: ICountry;
    logo?: IImage;
    createAt?: string;
    updateAt?: string;
    profileImage?: string;
    currency?: string;
    admin?: IUser;
    application: IApplication;
}


