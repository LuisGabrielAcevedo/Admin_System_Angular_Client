import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDrawer } from "@angular/material/sidenav";
import { ISidebarItem } from "../../../inferfaces/sideBar";
import { Router, ActivatedRoute } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-main-container",
  templateUrl: "./main-container.component.html",
  styleUrls: ["./main-container.component.css"]
})
export class MainContainerComponent implements OnInit {
  @ViewChild("drawer") sidebar: MatDrawer;
  sidebarItems: ISidebarItem[];
  constructor(
    private router: Router,
    private translateService: TranslateService
  ) {
    this.sidebarItems = [
      {
        name: this.translateService.instant("admin_system.plural_name"),
        route: "/admin-system",
        subItems: [
          {
            name: this.translateService.instant("companies.plural_name"),
            route: "/admin-system/companies"
          },
          {
            name: this.translateService.instant("stores.plural_name"),
            route: "/admin-system/stores"
          },
          {
            name: this.translateService.instant("users.plural_name"),
            route: "/admin-system/users"
          },
          {
            name: this.translateService.instant("applications.plural_name"),
            route: "/admin-system/applications"
          },
          {
            name: this.translateService.instant("countries.plural_name"),
            route: "/admin-system/countries"
          },
          {
            name: this.translateService.instant("states.plural_name"),
            route: "/admin-system/states"
          },
          {
            name: this.translateService.instant("inventory"),
            route: "/admin-system/inventory",
            subItems: [
              {
                name: this.translateService.instant("products.plural_name"),
                route: "/admin-system/inventory/products"
              },
              {
                name: this.translateService.instant(
                  "product_types.plural_name"
                ),
                route: "/admin-system/inventory/product-types"
              },
              {
                name: this.translateService.instant(
                  "product_categories.plural_name"
                ),
                route: "/admin-system/inventory/product-categories"
              },
              {
                name: this.translateService.instant("brands.plural_name"),
                route: "/admin-system/inventory/brands"
              },
              {
                name: this.translateService.instant("vendors.plural_name"),
                route: "/admin-system/inventory/vendors"
              },
              {
                name: this.translateService.instant("rooms.plural_name"),
                route: "/admin-system/inventory/rooms"
              }
            ]
          },
          {
            name: this.translateService.instant("sale"),
            route: "/admin-system/sale",
            subItems: [
              {
                name: this.translateService.instant("cart"),
                route: "/admin-system/sale/cart"
              }
            ]
          }
        ]
      },
      {
        name: this.translateService.instant("examples"),
        subItems: [
          {
            name: "Mercado libre",
            route: "/examples/mercado-libre"
          },
          {
            name: "Youtube",
            route: "/examples/youtube"
          },
          {
            name: "Netflix",
            route: "/examples/netflix"
          }
        ]
      },
      {
        name: this.translateService.instant("games"),
        subItems: [
          {
            name: this.translateService.instant("snake"),
            route: "/games/snake"
          }
        ]
      }
    ];
  }

  ngOnInit() {}

  public goTo(route: string): void {
    this.router.navigate([route]);
    this.sidebar.toggle();
  }
}
