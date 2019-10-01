import { Injectable } from "@angular/core";
import {
  IOrder,
  orderDefault,
  IOrderItem
} from "src/app/inferfaces/admin-system/order";
import cloneDeep from "lodash/cloneDeep";
import { Observable, of } from "rxjs";

@Injectable()
export class OrderService {
  public order: IOrder;

  public createOrder() {
    this.order = cloneDeep(orderDefault);
  }

  public addOrderItem(orderItem: IOrderItem): Observable<IOrder> {
    if (this.order) this.createOrder();
    return of(this.order);
  }
}
