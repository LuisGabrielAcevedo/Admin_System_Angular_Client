import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TableButtonAction } from '../../components/sharedComponents/table/table.interfaces';


@Injectable()
export class MercadoLibreService {
    rowActions;
    constructor(private http: HttpClient) {
    }

    getProducts(value: string): Observable<any> {
        return this.http.get<any>(`https://api.mercadolibre.com/sites/MLA/search?q=:${value}`);
    }

    getRowActions(): TableButtonAction[] {
        return this.rowActions = null;
    }
}
