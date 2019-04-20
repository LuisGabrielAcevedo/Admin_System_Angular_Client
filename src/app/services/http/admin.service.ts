import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { IAdmin } from '../../inferfaces/admin';
import { Global } from './url';
import { ILoadRequest, loadRequestDataDefault } from 'src/app/inferfaces/loadRequest';
import { TablePagination } from '../../components/sharedComponents/table/table.interfaces';


@Injectable()
export class AdminService {
    public url;
    public loadRequestData: ILoadRequest = JSON.parse(JSON.stringify(loadRequestDataDefault));
    constructor(private http: HttpClient) {
        this.url = Global.url_api;
    }

    getAdmins(): Observable<any> {
        let params = new HttpParams();
        for (const param in this.loadRequestData) {
            if (this.loadRequestData.hasOwnProperty(param) && this.loadRequestData[param]) {
                params = params.set(param, this.loadRequestData[param]);
            }
        }
        return this.http.get<any>(`${this.url}/admins`, { params });
    }

    saveAdmin(admin: IAdmin): Observable<any> {
        return this.http.post<any>(`${this.url}/admins/register`, admin);
    }

    updateAdmin(admin: IAdmin, file?: File): Observable<any> {
        const formData = new FormData();
        if (file) {
            formData.append('file', file, file.name);
        }
        for (const element in admin) {
            if (admin.hasOwnProperty(element) && element !== '_id') {
                formData.append(element, admin[element]);
            }
        }
        return this.http.put<any>(`${this.url}/admins/${admin._id}`, formData);
    }

    deleteAdmin(admin: IAdmin): Observable<any> {
        return this.http.delete<any>(`${this.url}/admins/${admin._id}`);
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
