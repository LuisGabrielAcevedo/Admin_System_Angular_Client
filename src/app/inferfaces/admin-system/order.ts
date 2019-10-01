export enum ECartTabActive {
  productList = "CartProductsListComponent",
  favoriteProductList = "CartFavoriteProductsListComponent",
  customersList = "CartCustomersListComponent",
  checkout = "CartCheckoutComponent"
}

export interface IOrder {
  id?: string;
  orderItems: IOrderItem[];
}

export interface IOrderItem {
  quantity: number;
  product: any;
}

export const orderDefault: IOrder = {
  id: "",
  orderItems: []
};
