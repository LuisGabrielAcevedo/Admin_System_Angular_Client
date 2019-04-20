import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ILoadRequest, loadRequestDataDefault } from 'src/app/inferfaces/loadRequest';
import { Global } from 'src/app/services/http/url';
import { ICustomer } from 'src/app/inferfaces/customer';
import { TablePagination } from '../../components/sharedComponents/table/table.interfaces';


@Injectable()
export class CustomerService {
    public url;
    public loadRequestData: ILoadRequest = JSON.parse(JSON.stringify(loadRequestDataDefault));

    constructor(private http: HttpClient) {
        this.url = Global.url_api;
    }

    getCustomers(): Observable<any> {
        let params = new HttpParams();
        for (const param in this.loadRequestData) {
            if (this.loadRequestData.hasOwnProperty(param) && this.loadRequestData[param]) {
                params = params.set(param, this.loadRequestData[param]);
            }
        }
        return this.http.get<any>(`${this.url}/customers`, {params});
    }

    getCustomersList(loadRequestData: ILoadRequest): Observable<any> {
        let params = new HttpParams();
        for (const param in loadRequestData) {
            if (loadRequestData.hasOwnProperty(param) && loadRequestData[param]) {
                if (typeof loadRequestData[param] === 'object') {
                    for (const element in loadRequestData[param]) {
                        if (loadRequestData[param].hasOwnProperty(element)) {
                            params = params.set(`filters[${element}]`, loadRequestData[param][element]);
                        }
                    }
                } else {
                    params = params.set(param, loadRequestData[param]);
                }
            }
        }
        return this.http.get<any>(`${this.url}/customers/search/all-list`, {params});
    }


    saveCustomer(customer: ICustomer): Observable<any> {
        return this.http.post<any>(`${this.url}/customers`, customer);
    }

    updateCustomer(customer: ICustomer, file?: File): Observable<any> {
        const formData = new FormData();
        if (file) {
            formData.append('file', file, file.name);
        }
        for (const element in customer) {
            if (customer.hasOwnProperty(element) && element !== '_id') {
                formData.append(element, customer[element]);
            }
        }
        return this.http.put<any>(`${this.url}/customers/${customer._id}`, formData);
    }


    deleteCustomer(customer: ICustomer): Observable<any> {
        return this.http.delete<any>(`${this.url}/customers/${customer._id}`);
    }

    changePagination(pagination: TablePagination): Observable<any> {
        this.loadRequestData.page = pagination.currentPage;
        this.loadRequestData.itemsPerPage = pagination.itemsPerPage;
        return of('change pagination');
    }

    changeSearchValue(value: string): Observable<any> {
        this.loadRequestData.search = value;
        this.loadRequestData.page = 1;
        return of('change searchValue');
    }

    resetLoadRequest(): Observable<any> {
        this.loadRequestData = JSON.parse(JSON.stringify(loadRequestDataDefault));
        return of('change loadResquest');
    }
}
