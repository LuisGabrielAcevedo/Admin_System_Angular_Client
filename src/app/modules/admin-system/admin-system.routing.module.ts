import { Routes, RouterModule } from "@angular/router";
import { ListComponent } from "src/app/modules/shared-modules/list/list.component";
import { FormComponent } from "src/app/modules/shared-modules/form/form.component";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "users",
    pathMatch: "full"
  },
  {
    path: ":resource",
    component: ListComponent
  },
  {
    path: "inventory/:resource",
    component: ListComponent
  },
  {
    path: "sale/cart",
    loadChildren: "./sale/cart/cart.module#CartModule"
  },
  {
    path: ":resource/new",
    component: FormComponent
  },
  {
    path: ":resource/edit/:id",
    component: FormComponent
  }
];

export const AdminSystemRouting = RouterModule.forChild(routes);
