import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavComponent } from './nav/nav.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [NavComponent],
  imports: [CommonModule, NgbModule, RouterModule, TranslateModule],
  exports: [NavComponent]
})
export class NavigationModule {}
