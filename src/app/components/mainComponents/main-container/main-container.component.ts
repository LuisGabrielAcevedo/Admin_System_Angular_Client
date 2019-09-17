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
        name: 'admin-system',
        subItems: [
          {
            name: 'Empresas',
            route: '/admin-system/companies'
          },
          {
            name: 'Tiendas',
            route: '/admin-system/stores'
          },
          {
            name: 'Productos',
            route: '/admin-system/products'
          },
          {
            name: 'Usuarios',
            route: '/admin-system/users'
          },
          {
            name: 'Clientes',
            route: '/admin-system/customers'
          },
          {
            name: 'Roles',
            route: '/admin-system/roles'
          },
          {
            name: 'Permisos',
            route: '/admin-system/permissions'
          },
          // {
          //   name: 'Administradores',
          //   route: '/admin-system/admins'
          // },
          {
            name: 'Aplicaciones',
            route: '/admin-system/applications'
          },
          {
            name: 'Paises',
            route: '/admin-system/countries'
          },
          {
            name: 'Estados',
            route: '/admin-system/states'
          },
          // {
          //   name: 'Categoria de productos',
          //   route: '/admin-system/product-categories'
          // },
          // {
          //   name: 'Licencias',
          //   route: '/admin-system/licenses'
          // },
          // {
          //   name: 'Marcas',
          //   route: '/admin-system/brands'
          // },
          // {
          //   name: 'Tipo de productos',
          //   route: '/admin-system/product-types'
          // },
          // {
          //   name: 'Vendedores',
          //   route: '/admin-system/vendors'
          // }
        ]
      },
      {
        name: 'Examples',
        subItems: [
          {
            name: 'Mercado libre (data-table)',
            route: '/examples/mercado-libre'
          },
          {
            name: 'Youtube (data-table)',
            route: '/examples/youtube'
          },
          {
            name: 'Cart',
            route: '/examples/cart'
          },
          {
            name: 'Netflix',
            route: '/examples/netflix'
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
