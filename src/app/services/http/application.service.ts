import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Global } from './url';
import { ILoadRequest, loadRequestDataDefault } from 'src/app/inferfaces/loadRequest';
import { IApplication } from '../../inferfaces/application';
import { TablePagination } from 'src/app/components/sharedComponents/table/table.interfaces';


@Injectable()
export class ApplicationService {
    public url;
    public loadRequestData: ILoadRequest = {...loadRequestDataDefault};
    constructor(private http: HttpClient) {
        this.url = Global.url_api;
    }

    getApplications(): Observable<any> {
        let params = new HttpParams();
        for (const param in this.loadRequestData) {
            if (this.loadRequestData.hasOwnProperty(param) && this.loadRequestData[param]) {
                params = params.set(param, this.loadRequestData[param]);
            }
        }
        return this.http.get<any>(`${this.url}/applications`, {params});
    }

    getApplicationsList(loadRequestData: ILoadRequest): Observable<any> {
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
        return this.http.get<any>(`${this.url}/applications/search/all-list`, {params});
    }

    saveApplication(application: IApplication): Observable<any> {
        return this.http.post<any>(`${this.url}/applications`, application);
    }

    updateApplication(application: IApplication): Observable<any> {
        return this.http.put<any>(`${this.url}/applications/${application._id}`, application);
    }

    deleteApplication(application: IApplication): Observable<any> {
        return this.http.delete<any>(`${this.url}/applications/${application._id}`);
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
        this.loadRequestData = {...loadRequestDataDefault};
        return of('change loadResquest');
    }
}
