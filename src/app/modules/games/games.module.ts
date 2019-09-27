import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GamesComponent } from "./games.component";
import { GamesRoutingModule } from "./games.routing.module";

@NgModule({
  declarations: [GamesComponent],
  imports: [CommonModule, GamesRoutingModule]
})
export class GamesModule {}
