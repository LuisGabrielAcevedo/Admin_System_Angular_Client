import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EnriStatusRes } from '../models/enri.model';

@Injectable({
  providedIn: 'root'
})
export class EnriStatusService {
  constructor(private http: HttpClient) {}

  public getEnriStatus(
    personType: 'OWNER' | 'CO_OWNER',
    customerId: number
  ): Observable<EnriStatusRes> {
    return this.http.get<EnriStatusRes>(
      `${environment.modules.persons}${customerId}/enri-status?personType=${personType}`
    );
  }
}
