import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { ISidebarItem } from '../../../inferfaces/sideBar';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

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
    public translateService: TranslateService
  ) {
    this.sidebarItems = [
      {
        name: this.translateService.instant('admin_system.plural_name'),
        subItems: [
          {
            name: this.translateService.instant('companies.plural_name'),
            route: '/admin-system/companies'
          },
          {
            name: this.translateService.instant('stores.plural_name'),
            route: '/admin-system/stores'
          },
          {
            name: this.translateService.instant('users.plural_name'),
            route: '/admin-system/users'
          },
          {
            name: this.translateService.instant('applications.plural_name'),
            route: '/admin-system/applications'
          },
          {
            name: this.translateService.instant('countries.plural_name'),
            route: '/admin-system/countries'
          },
          {
            name: this.translateService.instant('states.plural_name'),
            route: '/admin-system/states'
          }
        ]
      },
      {
        name: this.translateService.instant('examples'),
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
