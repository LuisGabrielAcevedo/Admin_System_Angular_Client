import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ILoadRequest, loadRequestDataDefault } from '../../inferfaces/loadRequest';
import { Global } from './url';
import { IPermission } from '../../inferfaces/permission';
import { TablePagination, TableButtonAction } from '../../components/sharedComponents/table/table.interfaces';
import { SelectApplicationsComponent } from '../../components/dialogComponents/select-applications/select-applications.component';
import { IApplication } from '../../inferfaces/application';
@Injectable()
export class PermissionService {
    public url;
    public loadRequestData: ILoadRequest = JSON.parse(JSON.stringify(loadRequestDataDefault));
    constructor(
        private http: HttpClient
    ) {
        this.url = Global.url_api;
    }

    getPermissions(): Observable<any> {
        let params = new HttpParams();
        for (const param in this.loadRequestData) {
            if (this.loadRequestData.hasOwnProperty(param) && this.loadRequestData[param]) {
                params = params.set(param, this.loadRequestData[param]);
            }
        }
        return this.http.get<any>(`${this.url}/permissions`, { params });
    }

    getPermissionsList(loadRequestData: ILoadRequest): Observable<any> {
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
        return this.http.get<any>(`${this.url}/permissions/search/all-list`, { params });
    }

    savePermission(permission: IPermission): Observable<any> {
        return this.http.post<any>(`${this.url}/permissions`, permission);
    }

    updatePermission(permission: IPermission): Observable<any> {
        return this.http.put<any>(`${this.url}/permissions/${permission._id}`, permission);
    }

    deletePermission(permission: IPermission): Observable<any> {
        return this.http.delete<any>(`${this.url}/permissions/${permission._id}`);
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

    getMultiActions(): TableButtonAction[] {
        return [
            {
                icon: 'settings',
                label: 'Seleccionar aplicacion',
                type: 'TableButtonComponent',
                dialog: {
                    component: SelectApplicationsComponent,
                    height: '240px',
                    width: '400px',
                    data: {
                        observable: (arg1, arg2) => {
                            return this.updateManyPermissions(arg1, arg2);
                        }
                    }
                }
            }
        ]
    }

    getRowActions(): TableButtonAction[] {
        return [
            {
                icon: 'chevron_left',
                type: 'TableButtonComponent',
                modal: {
                    number: 2,
                    row: 0,
                    buttons: [
                        {
                            icon: 'edit',
                            label: 'Editar',
                            type: 'TableButtonComponent',
                            redirectTo: '/administration/permissions/form'
                        },
                        {
                            icon: 'close',
                            label: 'Eliminar',
                            type: 'TableButtonComponent',
                            modal: {
                                number: 1,
                                row: 0,
                                question: 'Esta seguro que desea borrar el Permiso?',
                                successButtonText: 'Si',
                                successButtonDisabled: (arg) => { return true },
                                successButtonEvent: 'delete',
                                cancelButtonText: 'No'
                            }
                        }
                    ]
                }
            }
        ]
    }

    updateManyPermissions(permissions: IPermission[], applications: IApplication[]) :Observable<any>{
        return this.http.put<any>(`${this.url}/permissions`, {
            permissions,
            applications
        });
    }
}
