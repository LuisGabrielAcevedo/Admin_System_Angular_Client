import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SnakeComponent } from "./snake.component";
import { RouterModule } from "@angular/router";
import { TitleBarModule } from 'src/app/modules/shared-modules/title-bar/title-bar.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DynamicFormModule } from 'src/app/modules/shared-modules/dynamic-form/dynamic-form.module';
import { MatButtonModule } from '@angular/material';
import { SnakeCanvasComponent } from './snake-canvas/snake-canvas.component';

@NgModule({
  declarations: [SnakeComponent, SnakeCanvasComponent],
  imports: [
    CommonModule,
    TitleBarModule,
    FlexLayoutModule,
    DynamicFormModule,
    MatButtonModule,
    RouterModule.forChild([
      {
        path: "",
        component: SnakeComponent
      }
    ])
  ]
})
export class SnakeModule {}
