import { ICustomer } from './customer';
import { IUser } from './user';
import { IProduct } from './product';

export interface IOrder {
    _id?: string;
    customerId: ICustomer;
    orderItems: IOrderItem[];
    userId: IUser;
    total?: number;
    subtotal?: number;
    tax?: number;
    discount?: number;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
}

export interface IOrderItem {
    _id?: string;
    productId: IProduct;
    quantity: number;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string;
}

