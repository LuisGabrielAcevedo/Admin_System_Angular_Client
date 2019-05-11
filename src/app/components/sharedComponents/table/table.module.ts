import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../../../material/material.module';
import { TableButtonComponent } from './table-button/table-button.component';
import { TableSearchComponent } from './table-search/table-search.component';
import { TablePaginatorComponent } from './table-paginator/table-paginator.component';
import { TableImageComponent } from './table-image/table-image.component';
import { TableModalComponent } from './table-modal/table-modal.component';
import { TableTextComponent } from './table-text/table-text.component';
import { TableContainerComponent } from './table-container/table-container.component';
import { TableTextModule } from './table-text/table-text.module';
import { TableDirective } from './table-container/table-container.directive';
import { TableButtonModule } from './table-button/table-button.module';
import { TableImageModule } from './table-image/image-button.module';
import { TableMultiActionsComponent } from './table-multi-actions/table-multi-actions.component';
import { TableGalleryModule } from './table-gallery/table-gallery.module';
import { TableGalleryComponent } from './table-gallery/table-gallery.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableItemInformationComponent } from './table-item-information/table-item-information.component';
import { TableItemInformationModule } from './table-item-information/table-item-information.module';
import { RouterModule } from '@angular/router';
import { TableApplicationTypeComponent } from './table-application-type/table-application-type.component';
import { TableApplicationTypeModule } from './table-application-type/table-application-type.module';
import { TableSecondTableModule } from './table-second-table/table-second-table.module';
import { TableSecondTableComponent } from './table-second-table/table-second-table.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    TableTextModule,
    TableApplicationTypeModule,
    TableButtonModule,
    TableSecondTableModule,
    TableImageModule,
    TableGalleryModule,
    TableItemInformationModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  declarations: [
    TableComponent,
    TableModalComponent,
    TablePaginatorComponent,
    TableSearchComponent,
    TableContainerComponent,
    TableDirective,
    TableMultiActionsComponent
  ],
  entryComponents: [
    TableTextComponent,
    TableApplicationTypeComponent,
    TableButtonComponent,
    TableImageComponent,
    TableGalleryComponent,
    TableItemInformationComponent,
    TableSecondTableComponent
  ],
  exports: [TableComponent]
})
export class TableModule { }
