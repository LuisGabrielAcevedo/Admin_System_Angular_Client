import { ICompany } from './company';
import { IProductType } from './productType';
import { IProductCategory } from './productCategory';
import { IImage } from './images';
import { IBrand } from './brand';
import { ILocal } from './local';

export interface IProduct {
    _id?: string;
    name: string;
    applicationCode: string;
    company: ICompany;
    type?: IProductType;
    category?: IProductCategory;
    description?: string;
    details?: string;
    createdAt?: string;
    updatedAt?: string;
    profileImage?: IImage;
    images?: IImage[];
    brand?: IBrand;
    active?: boolean;
    locals?: ILocal;
    // boxes?: IBox;
    price: string;
    unit: string;
    pricePerLocal?: boolean;
    // pricePerLocalsData?: IPricePerLocal;
    tax?: string;
    totalAvailable: string;
    // discounts: IDiscountPerProduct[];
    // vendor: IVendor;
    characteristics: object;
}

export interface IProductCharacteristics {
    // Global
    colors?: string[];
    condition?: string;
    vendorCode: string;
    year?: string;

    engine?: string;
    chassis?: string;
    power?: string;
    torque?: string;
    transmission?: string;
    registration?: string;
    model?: string;

}

export const ICarSaleProduct = {
    condition: '',
    vendorCode: '',
    year: '',
    engine: '',
    chassis: '',
    power: '',
    torque: '',
    transmission: '',
    registration: '',
    model: ''
};
