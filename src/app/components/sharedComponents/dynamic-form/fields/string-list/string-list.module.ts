import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StringListComponent } from './string-list.component';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DynamicFormDirectivesModule } from '../../directives/dynamic-form-directives.module';

@NgModule({
  declarations: [StringListComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    FlexLayoutModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    DynamicFormDirectivesModule
  ]
})
export class StringListModule { }
