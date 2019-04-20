import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableButtonComponent } from './table-button.component';
import { MaterialModule } from '../../../../material/material.module';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule
    ],
    declarations: [TableButtonComponent],
    exports: [TableButtonComponent]
})
export class TableButtonModule { }
