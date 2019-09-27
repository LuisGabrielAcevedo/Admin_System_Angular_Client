import { Routes, RouterModule } from "@angular/router";
import { GamesComponent } from "./games.component";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "snake",
    pathMatch: "full"
  },
  {
    path: "snake",
    component: GamesComponent,
    loadChildren: "./snake/snake.module#SnakeModule"
  }
];

export const GamesRoutingModule = RouterModule.forChild(routes);
