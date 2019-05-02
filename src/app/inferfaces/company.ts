import { IImage } from 'src/app/inferfaces/images';
import { IApplication } from './application';
import { IUser } from './user';
import { ICountry } from './country';
import { ILocal } from './local';

export interface ICompany {
    _id?: string;
    name: string;
    country: ICountry;
    logo?: IImage;
    createAt?: string;
    updateAt?: string;
    deletedAt?: string;
    profileImage?: IImage;
    currencies?: string[];
    stores: ILocal[];
    admin?: IUser;
    application: IApplication;
}


