import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    loadChildren:
      "src/app/modules/main-modules/main-container/main-container.module#MainContainerModule"
  },
  {
    path: "login",
    loadChildren: "src/app/modules/main-modules/login/login.module#LoginModule"
  },
  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
