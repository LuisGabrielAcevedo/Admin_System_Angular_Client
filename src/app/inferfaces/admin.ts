import { IImage } from './images';

export interface IAdmin {
    _id?: string;
    email: string;
    password: string;
    userName: string;
    firstName?: string | null;
    lastName?: string | null;
    createAt?: string | null;
    updateAt?: string | null;
    profileImage?: IImage;
}
