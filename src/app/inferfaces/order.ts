import { IUser } from "./user";

export interface IOrder {
  _id?: string;
  customerId: any;
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
  productId: any;
  quantity: number;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}
