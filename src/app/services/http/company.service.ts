import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ILoadRequest, loadRequestDataDefault } from 'src/app/inferfaces/loadRequest';
import { ICompany } from 'src/app/inferfaces/company';
import { TablePagination, TableButtonAction } from 'src/app/components/sharedComponents/table/table.interfaces';
import { Global } from 'src/app/services/http/url';
import { UserService } from './user.service';
import { StoreService } from './local.service';


@Injectable()
export class CompanyService {
    public url;
    public loadRequestData: ILoadRequest = JSON.parse(JSON.stringify(loadRequestDataDefault));
    constructor(
        private http: HttpClient,
        private userService: UserService,
        private storeService: StoreService
    ) {
        this.url = Global.url_api;
    }

    getCompanies(): Observable<any> {
        let params = new HttpParams();
        for (const param in this.loadRequestData) {
            if (this.loadRequestData.hasOwnProperty(param) && this.loadRequestData[param]) {
                params = params.set(param, this.loadRequestData[param]);
            }
        }
        return this.http.get<any>(`${this.url}/companies`, { params });
    }

    saveCompany(company: ICompany): Observable<any> {
        return this.http.post<any>(`${this.url}/companies`, company);
    }

    deleteCompany(company: ICompany): Observable<any> {
        return this.http.delete<any>(`${this.url}/companies/${company._id}`);
    }

    updateCompany(company: ICompany, file?: File): Observable<any> {
        const formData = new FormData();
        if (file) {
            formData.append('file', file, file.name);
        }
        for (const element in company) {
            if (company.hasOwnProperty(element) && element !== '_id') {
                formData.append(element, company[element]);
            }
        }
        return this.http.put<any>(`${this.url}/companies/${company._id}`, formData);
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

    getCompaniesList(loadRequestData: ILoadRequest): Observable<any> {
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
        return this.http.get<any>(`${this.url}/companies/search/all-list`, { params });
    }
    getRowActions() {
        let actions: TableButtonAction[] = [
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
                            redirectTo: '/administration/companies/form'
                        },
                        {
                            icon: 'group',
                            label: 'Empleados',
                            type: 'TableButtonComponent',
                            activeComponet: {
                                type: 'TableGalleryComponent',
                                row: 0,
                                data: {
                                    observable: (arg) => {
                                        return this.getUsers(arg);
                                    },
                                    galleryConfig: {
                                        galleryType: 'GALLERY_USER',
                                        galleryListData: 'data',
                                        galleryImage: 'profileImage.url',
                                        galleryTitle: 'firstName',
                                        gallerySubTitle: 'email',
                                        galleryDescription: '',
                                        button: {
                                            icon: 'subdirectory_arrow_right'
                                        }
                                    }
                                }
                            }
                        },
                        {
                            icon: 'store_mall_directory',
                            label: 'Tiendas',
                            type: 'TableButtonComponent',
                            activeComponet: {
                                type: 'TableGalleryComponent',
                                row: 0,
                                data: {
                                    observable: (arg) => {
                                        return this.getStores(arg);
                                    },
                                    galleryConfig: {
                                        galleryType: 'GALLERY_USER',
                                        galleryListData: 'data',
                                        galleryImage: 'profileImage.url',
                                        galleryTitle: 'name',
                                        gallerySubTitle: 'description',
                                        galleryDescription: '',
                                        button: {
                                            icon: 'subdirectory_arrow_right'
                                        }
                                    }
                                }
                            }
                        },
                        {
                            icon: 'close',
                            label: 'Eliminar',
                            type: 'TableButtonComponent',
                            modal: {
                                number: 1,
                                row: 0,
                                question: 'Esta seguro que desea borrar la empresa?',
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
        return actions;
    }

    getUsers(company: ICompany): Observable<any> {
        return this.userService.getUsersList({
            filters: { company: company._id }
        })
    }

    getStores(company: ICompany): Observable<any> {
        return this.storeService.getLocalsList({
            filters: { company: company._id }
        })
    }
}
