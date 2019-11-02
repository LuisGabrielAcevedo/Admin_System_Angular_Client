import {
  NormalizerResponse,
  NormalizerRequest
} from './../models/address-normalizer.model';
import { Address } from './../models/contact-data-form.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddressNormalizerService {
  constructor(private http: HttpClient) {}

  // WIP
  normalizeAddress(req: NormalizerRequest): Observable<NormalizerResponse> {
    return this.http.post<NormalizerResponse>(
      `${environment.modules.addressNormalizer}/normalize`,
      req
    );
  }
}
