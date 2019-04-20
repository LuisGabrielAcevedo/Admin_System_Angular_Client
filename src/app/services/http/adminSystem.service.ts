import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Global } from './url';
import { Observable } from 'rxjs';


@Injectable()
export class AdminSystemService {
    public url;
    constructor(private http: HttpClient) {
        this.url = Global.url_api;
    }

    loadApiProductTypes(): Observable<any> {
        return this.http.get<any>(`${this.url}/apiProductTypes`);
    }

    loadUnits(): Observable<any> {
        return this.http.get<any>(`${this.url}/units`);
    }

    loadCoins(): Observable<any> {
        return this.http.get<any>(`${this.url}/coins`);
    }
}
