import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableItemInformationComponent } from './table-item-information.component';
import { MaterialModule } from '../../../../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
        FlexLayoutModule
    ],
    declarations: [TableItemInformationComponent]
})
export class TableItemInformationModule { }
