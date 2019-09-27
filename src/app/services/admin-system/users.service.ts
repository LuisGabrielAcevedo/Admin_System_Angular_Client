import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable, of } from "rxjs";
import {
  DynamicTablePagination,
  DynamicTableButtonAction
} from "src/app/modules/shared-modules/table/table.interfaces";
import {
  ILoadRequest,
  loadRequestDataDefault
} from "src/app/inferfaces/loadRequest";
import { Global } from "../http/url";
import { IUser } from "../../inferfaces/user";
import { Router } from "@angular/router";
import { ProfileCardComponent } from "src/app/modules/admin-system/system/profile-card/profile-card.component";
import User from "../../models/admin-system/users";
import Follow from "src/app/models/admin-system/follows";

@Injectable({
  providedIn: "root"
})
export default class UserService {
  public url;
  public loadRequestData: ILoadRequest = JSON.parse(
    JSON.stringify(loadRequestDataDefault)
  );
  constructor(private http: HttpClient, private router: Router) {
    this.url = Global.url_api;
  }

  login(user: object): Observable<any> {
    return this.http.post<any>(`${this.url}/users/login`, user);
  }

  getUsers(): Observable<any> {
    let params = new HttpParams();
    for (const param in this.loadRequestData) {
      if (
        this.loadRequestData.hasOwnProperty(param) &&
        this.loadRequestData[param]
      ) {
        params = params.set(param, this.loadRequestData[param]);
      }
    }

    return this.http.get<any>(`${this.url}/users`, { params });
  }

  getUsersList(loadRequestData: ILoadRequest): Observable<any> {
    let params = new HttpParams();
    for (const param in loadRequestData) {
      if (loadRequestData.hasOwnProperty(param) && loadRequestData[param]) {
        if (typeof loadRequestData[param] === "object") {
          for (const element in loadRequestData[param]) {
            if (loadRequestData[param].hasOwnProperty(element)) {
              params = params.set(
                `filters[${element}]`,
                loadRequestData[param][element]
              );
            }
          }
        } else {
          params = params.set(param, loadRequestData[param]);
        }
      }
    }
    return this.http.get<any>(`${this.url}/users/search/all-list`, { params });
  }

  getUser(id: string): Observable<any> {
    return this.http.get<any>(`${this.url}/users/${id}`);
  }

  saveUser(user: IUser): Observable<any> {
    return this.http.post<any>(`${this.url}/users/register`, user);
  }

  updateUser(user: IUser, file?: File): Observable<any> {
    const formData = new FormData();
    if (file) {
      formData.append("file", file, file.name);
    }
    for (const element in user) {
      if (user.hasOwnProperty(element) && element !== "_id") {
        formData.append(element, user[element]);
      }
    }
    return this.http.put<any>(`${this.url}/users/${user._id}`, formData);
  }

  deleteUser(user: IUser): Observable<any> {
    return this.http.delete<any>(`${this.url}/users/${user._id}`);
  }

  changePagination(pagination: DynamicTablePagination): Observable<any> {
    this.loadRequestData.page = pagination.currentPage;
    this.loadRequestData.itemsPerPage = pagination.itemsPerPage;
    return of("change pagination");
  }

  changeSearchValue(value: string): Observable<any> {
    this.loadRequestData.search = value;
    this.loadRequestData.page = 1;
    return of("change searchValue");
  }

  resetLoadRequest(): Observable<any> {
    this.loadRequestData = JSON.parse(JSON.stringify(loadRequestDataDefault));
    return of("change loadResquest");
  }

  getRowActions() {
    const actions: DynamicTableButtonAction[] = [
      {
        icon: "chevron_left",
        type: "TableButtonComponent",
        modal: {
          number: 2,
          row: 0,
          buttons: [
            {
              icon: "edit",
              label: "Editar",
              type: "TableButtonComponent",
              event: arg => {
                this.router.navigate(["/admin-system/users/edit", arg._id]);
              }
            },
            {
              icon: "info",
              label: "Informacion",
              type: "TableButtonComponent",
              dialog: {
                component: ProfileCardComponent,
                height: "402px",
                width: "400px",
                data: {
                  cardConfig: {
                    cardType: "CARD_USER",
                    cardImage: "profileImage.url",
                    cardTitle: "firstName,lastName",
                    cardSubTitle: "email",
                    labels: [
                      "Id",
                      "Empresa",
                      "Rol",
                      "Registro",
                      "Actualizacion"
                    ],
                    columnData: [
                      "_id",
                      "company.name",
                      "role.name",
                      "createdAt",
                      "updatedAt"
                    ],
                    rowActions: [
                      {
                        label: "mail_outline",
                        icon: "mail_outline"
                      }
                    ]
                  }
                }
              }
            },
            {
              icon: "group",
              label: "Seguidores",
              type: "TableButtonComponent",
              activeComponet: {
                type: "TableGalleryComponent",
                row: 0,
                data: {
                  observable: arg => Follow.where("followed", arg._id).findRx(),
                  galleryConfig: {
                    galleryType: "GALLERY_USER",
                    galleryListData: "data",
                    galleryImage: "following.profileImage.url",
                    galleryTitle: "following.firstName",
                    gallerySubTitle: "following.email",
                    galleryDescription: "",
                    button: {
                      icon: "subdirectory_arrow_right"
                    }
                  }
                }
              },
              visible: arg =>
                arg.application &&
                arg.application._id === "5cca3732a342520bbcd24563"
            },
            {
              icon: "group",
              label: "Seguidos",
              type: "TableButtonComponent",
              activeComponet: {
                type: "TableGalleryComponent",
                row: 0,
                data: {
                  observable: arg =>
                    Follow.where("following", arg._id).findRx(),
                  galleryConfig: {
                    galleryType: "GALLERY_USER",
                    galleryListData: "data",
                    galleryImage: "followed.profileImage.url",
                    galleryTitle: "followed.firstName",
                    gallerySubTitle: "followed.email",
                    galleryDescription: "",
                    button: {
                      icon: "subdirectory_arrow_right"
                    }
                  }
                }
              },
              visible: arg => {
                return (
                  arg.application &&
                  arg.application._id === "5cca3732a342520bbcd24563"
                );
              }
            },
            {
              icon: "delete",
              label: "Eliminar",
              type: "TableButtonComponent",
              modal: {
                number: 1,
                row: 0,
                question: "Esta seguro que desea borrar el Usuario?",
                successButtonText: "Si",
                successButtonDisabled: arg => true,
                successButtonEvent: arg => User.destroyRx(arg._id),
                cancelButtonText: "No"
              }
            }
          ]
        }
      }
    ];
    return actions;
  }
}
