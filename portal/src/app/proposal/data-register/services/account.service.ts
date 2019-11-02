import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AccountPartialProposal } from '../api/accountPartialProposal';

@Injectable({ providedIn: 'root' })
export class AccountService {
  constructor(private http: HttpClient) {}

  public getAccount(
    ownerNup: number,
    coOwnerNup: number
  ): Observable<AccountPartialProposal> {
    let params = new HttpParams();
    if (ownerNup) {
      params = params.append('ownerNup', ownerNup.toString());
    }
    if (coOwnerNup) {
      params = params.append('coOwnerNup', coOwnerNup.toString());
    }
    return this.http.get<AccountPartialProposal>(
      //   'http://localhost:3000/bank-accounts/accounts',
      //   { params },
      // );
      `${environment.modules.accounts}bank-accounts`,
      { params }
    );
  }

  // return this.http.get<Gestor>(`https://viverebrasil.com.br/sanrioapigwhml/domains/sellingPoint/${idSellingPoint}`);
}
