import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SellingPoint } from './api/sellingPoint';
import { Gestor } from '../../proposal/data-register/api/gestor';
import { tap } from 'rxjs/operators';
import { SessionStorageService } from './session-storage.service';

@Injectable({
  providedIn: 'root'
})
export class SellingPointService {
  constructor(
    private httpClient: HttpClient,
    private sessionStorageService: SessionStorageService
  ) {}

  public getSellingPoint(id: string = ''): Observable<SellingPoint> {
    return this.httpClient
      .get<SellingPoint>(`${environment.modules.domain}sellingPoints/${id}`)
      .pipe(
        tap(response =>
          this.sessionStorageService.setSellingPointCode(
            response.sellingPointCode
          )
        )
      );
  }

  public getManager(idSellingPoint: number = 0): Observable<Gestor> {
    return this.httpClient.get<Gestor>(
      `${environment.modules.domain}sellingPoints/${idSellingPoint}`
    );
  }
}
