import { Routes, RouterModule } from "@angular/router";
import { MainContainerComponent } from "./main-container.component";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "admin-system",
    pathMatch: "full"
  },
  {
    path: "home",
    component: MainContainerComponent,
    loadChildren: "src/app/modules/home/home.module#HomeModule"
  },
  {
    path: "examples",
    component: MainContainerComponent,
    loadChildren: "src/app/modules/examples/examples.module#ExamplesModule"
  },
  {
    path: "games",
    component: MainContainerComponent,
    loadChildren: "src/app/modules/games/games.module#GamesModule"
  },
  {
    path: "admin-system",
    component: MainContainerComponent,
    loadChildren:
      "src/app/modules/admin-system/admin-system.module#AdminSystemModule"
  }
];

export const MainContainerRouting = RouterModule.forChild(routes);
