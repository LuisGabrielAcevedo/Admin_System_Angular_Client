import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SessionStorageService {
  SELLING_POINT_ID_KEY = 'idSellingPoint';
  SELLING_POINT_CODE_KEY = 'sellingPointCode';
  constructor() {}

  public setSellingPointId(idSellingPoint) {
    window.sessionStorage.setItem(this.SELLING_POINT_ID_KEY, idSellingPoint);
  }

  public getSellingPointId(): number {
    return window.sessionStorage.getItem(this.SELLING_POINT_ID_KEY)
      ? Number(window.sessionStorage.getItem(this.SELLING_POINT_ID_KEY))
      : 540;
  }
  public setSellingPointCode(sellingPointCode) {
    window.sessionStorage.setItem(
      this.SELLING_POINT_CODE_KEY,
      sellingPointCode
    );
  }

  public getSellingPointCode(): string {
    return window.sessionStorage.getItem(this.SELLING_POINT_CODE_KEY)
      ? window.sessionStorage.getItem(this.SELLING_POINT_CODE_KEY)
      : '540';
  }
}
