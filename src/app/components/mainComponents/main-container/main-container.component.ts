import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { ISidebarItem } from '../../../inferfaces/sideBar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.css']
})
export class MainContainerComponent implements OnInit {
  @ViewChild('drawer') sidebar: MatDrawer;
  sidebarItems: ISidebarItem[];
  constructor(
    private router: Router,
  ) {
    this.sidebarItems = [
      {
        name: 'Home',
        subItems: []
      },
      {
        name: 'Administration',
        subItems: [
          {
            name: 'Usuarios',
            route: '/administration/users/list'
          },
          {
            name: 'Roles',
            route: '/administration/roles/list'
          },
          {
            name: 'Permisos',
            route: '/administration/permissions/list'
          },
          {
            name: 'Empresas',
            route: '/administration/companies/list'
          },
          {
            name: 'Tiendas',
            route: '/administration/locals/list'
          },
          {
            name: 'Consumidores',
            route: '/administration/customers/list'
          },
          // {
          //   name: 'Administradores',
          //   route: '/administration/admins/list'
          // },
          {
            name: 'Aplicaciones',
            route: '/administration/applications/list'
          },
          {
            name: 'Paises',
            route: '/administration/countries/list'
          },
          {
            name: 'Categoria de productos',
            route: '/administration/product-categories/list'
          },
          {
            name: 'Licencias',
            route: '/administration/licenses/list'
          },
          {
            name: 'Marcas',
            route: '/administration/brands/list'
          },
          {
            name: 'Productos',
            route: '/administration/products/list'
          },
          {
            name: 'Tipo de productos',
            route: '/administration/product-types/list'
          },
          {
            name: 'Vendedores',
            route: '/administration/vendors/list'
          }

        ]
      },
      {
        name: 'Examples',
        subItems: [
          {
            name: 'Mercado libre',
            route: '/examples/mercado-libre'
          },
          {
            name: 'Youtube',
            route: '/examples/youtube'
          },
          {
            name: 'Cart',
            route: '/examples/cart'
          }
        ]
      }
    ];
  }

  ngOnInit() {
  }

  goTo(route: string) {
    this.router.navigate([route]);
    this.sidebar.toggle();
  }

}
