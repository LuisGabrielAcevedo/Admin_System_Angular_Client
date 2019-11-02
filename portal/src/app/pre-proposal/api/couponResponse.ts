export interface CouponResponse {
  indexerCode: string;
  coupons: Coupon[];
}

export interface Coupon {
  coupon: string;
  description: string;
  financedAmount: number;
  ltv: number;
}
