import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ILoadRequest, loadRequestDataDefault } from 'src/app/inferfaces/loadRequest';
import { ICompany } from 'src/app/inferfaces/company';
import { TableButtonAction } from 'src/app/components/sharedComponents/table/table.interfaces';
import { Global } from 'src/app/services/http/url';
import UserService  from './users.service';
import { StoreService } from './http/local.service';
import { CustomerService } from './http/customer.service';
import { ProductService } from './http/product.service';
import { OrderService } from './http/order.service';
import { ProfileCardComponent } from 'src/app/components/dialogComponents/profile-card/profile-card.component';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export default class CompanyService {
    public url;
    public loadRequestData: ILoadRequest = JSON.parse(JSON.stringify(loadRequestDataDefault));
    constructor(
        private http: HttpClient,
        private userService: UserService,
        private storeService: StoreService,
        private customerService: CustomerService,
        private productService: ProductService,
        private orderService: OrderService,
        private router: Router
    ) {
        this.url = Global.url_api;
    }

    getRowActions() {
        const actions: TableButtonAction[] = [
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
                            event: (arg) => {
                                this.router.navigate(['/administration/companies/form', arg._id]);
                            }
                        },
                        {
                            icon: 'info',
                            label: 'Informacion',
                            type: 'TableButtonComponent',
                            dialog: {
                                component: ProfileCardComponent,
                                height: '442px',
                                width: '408px',
                                data: {
                                    cardConfig: {
                                        cardType: 'CARD_IMAGE',
                                        cardImage: 'profileImage.url',
                                        cardTitle: 'name',
                                        cardSubTitle: 'country.name',
                                        labels: [
                                            'Id',
                                            'Pais',
                                            'Aplicacion',
                                            'Monedas',
                                            'Administrador',
                                            'Registro',
                                            'Actualizacion'
                                        ],
                                        columnData: [
                                            '_id',
                                            'country.name',
                                            'application.name',
                                            'currencies',
                                            'admin.firstName',
                                            'createdAt',
                                            'updatedAt'
                                        ],
                                        rowActions: [{
                                            label: 'mail_outline',
                                            icon: 'mail_outline'
                                        }]
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
                                        galleryType: 'GALLERY_IMAGE',
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
                            icon: 'view_compact',
                            label: 'Productos',
                            type: 'TableButtonComponent',
                            activeComponet: {
                                type: 'TableGalleryComponent',
                                row: 0,
                                data: {
                                    observable: (arg) => {
                                        return this.getProducts(arg);
                                    },
                                    galleryConfig: {
                                        galleryType: 'GALLERY_IMAGE_CARD',
                                        galleryListData: 'data',
                                        galleryImage: 'profileImage.url',
                                        galleryTitle: 'name',
                                        gallerySubTitle: 'totalAvailable/b/Disponible:',
                                        galleryDescription: '',
                                        button: {
                                            icon: 'subdirectory_arrow_right'
                                        }
                                    }
                                }
                            }
                        },
                        {
                            icon: 'list',
                            label: 'Ordenes',
                            type: 'TableButtonComponent',
                            activeComponet: {
                                type: 'TableSecondTableComponent',
                                row: 0,
                                data: {
                                    observable: (arg) => {
                                        return this.getOrders(arg);
                                    },
                                    secondTableConfig: {
                                        secondTableListData: 'data',
                                        multiSelect: true,
                                        fields: [
                                            {
                                                label: 'Id',
                                                value: '_id',
                                                type: 'TableTextComponent'
                                            },
                                            {
                                                label: 'Usuario',
                                                value: 'user.firstName',
                                                type: 'TableTextComponent'
                                            },
                                            {
                                                label: 'Cliente',
                                                value: 'customer.firstName',
                                                type: 'TableTextComponent'
                                            },
                                            {
                                                label: 'Total',
                                                value: 'total/b/ AR $',
                                                type: 'TableTextComponent'
                                            },
                                            {
                                                label: 'Estado',
                                                value: 'status',
                                                type: 'TableTextComponent'
                                            }
                                        ]
                                    }
                                }
                            }
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
                                            icon: 'subdirectory_arrow_right',
                                            event: (arg) => {
                                                this.router.navigate(['/administration/users/form', arg._id]);
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        {
                            icon: 'people',
                            label: 'Clientes',
                            type: 'TableButtonComponent',
                            activeComponet: {
                                type: 'TableGalleryComponent',
                                row: 0,
                                data: {
                                    observable: (arg) => {
                                        return this.getCustomers(arg);
                                    },
                                    galleryConfig: {
                                        galleryType: 'GALLERY_USER',
                                        galleryListData: 'data',
                                        galleryImage: 'profileImage.url',
                                        galleryTitle: 'firstName,lastName',
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
                            icon: 'close',
                            label: 'Eliminar',
                            type: 'TableButtonComponent',
                            modal: {
                                number: 1,
                                row: 0,
                                question: 'Esta seguro que desea borrar la empresa?',
                                successButtonText: 'Si',
                                successButtonDisabled: (arg) => true,
                                successButtonEvent: 'delete',
                                cancelButtonText: 'No'
                            }
                        }
                    ]
                }
            }
        ];
        return actions;
    }

    getUsers(company: ICompany): Observable<any> {
        return this.userService.getUsersList({
            filters: { company: company._id }
        });
    }

    getStores(company: ICompany): Observable<any> {
        return this.storeService.getLocalsList({
            filters: { company: company._id }
        });
    }

    getCustomers(company: ICompany): Observable<any> {
        return this.customerService.getCustomersList({
            filters: { company: company._id }
        });
    }

    getProducts(company: ICompany): Observable<any> {
        return this.productService.getProductsList({
            filters: { company: company._id }
        });
    }

    getOrders(company: ICompany): Observable<any> {
        return this.orderService.getOrdersList({
            filters: { company: company._id }
        });
    }
}
