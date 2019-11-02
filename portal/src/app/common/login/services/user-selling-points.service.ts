import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserSellingPoint } from '../models/state/selling-point';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { GetSellingPointResponseDTO } from '../models/api/get.selling-point';
import { map } from 'rxjs/operators';

@Injectable()
export class UserSellingPointsService {
  constructor(private httpClient: HttpClient) {}
  public getSellingPoint(id: number): Observable<UserSellingPoint> {
    return this.httpClient
      .get<GetSellingPointResponseDTO>(
        `${environment.modules.domain}sellingPoints/${id}`
      )
      .pipe(
        map(response =>
          this.mapGetSellingPointResponseDTO2SellingPoint(response)
        )
      );
  }

  public mapGetSellingPointResponseDTO2SellingPoint(
    dto: GetSellingPointResponseDTO
  ): UserSellingPoint {
    const {
      idSellingPoint: id,
      name,
      sellingPointCode: code,
      features: {
        carEnabled = false,
        sellingPointActive = false,
        utilitarianEnabled = false
      }
    } = dto;

    return {
      id,
      name,
      code,
      features: { carEnabled, sellingPointActive, utilitarianEnabled }
    };
  }
}
