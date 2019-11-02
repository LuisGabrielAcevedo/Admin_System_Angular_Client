import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { checklistReducerMap } from './store/reducers/checklist.reducers';
import { initialChecklistState } from './store/checklist.state';
import { StoreModule } from '@ngrx/store';
import { ChecklistManagerContainer } from './containers/checklist-manager.container';
import { EffectsModule } from '@ngrx/effects';
import { PdfViewerModule } from 'ng2-pdf-viewer';

import { ChecklistEffects } from './store/effects/checklist.effects';
import { ChecklistItemComponent } from './components/checklist-item/checklist-item.component';
import { DocumentManagerComponent } from './components/document-manager/document-manager.component';
import { DocumentManagerHeaderComponent } from './components/document-manager-header/document-manager-header.component';
import { DocumentManagerPagesComponent } from './components/document-manager-pages/document-manager-pages.component';
import { DocumentManagerCanvasComponent } from './components/document-manager-canvas/document-manager-canvas.component';
import { CanvasMenuComponent } from './components/zoom-control/canvas-menu.component';
import { PinchZoomComponent } from './components/pinch-zoom/pinch-zoom.component';
import { PdfViewerComponent } from './components/pdf-viewer/pdf-viewer.component';
import { DocumentManagerWindowContainer } from './containers/document-manager-window.container';
import { ViewChecklistItemComponent } from './components/view-checklist-item/view-checklist-item.component';
import { ViewChecklistManagerContainer } from './containers/view-checklist-manager.container';
import { ViewDocumentManagerComponent } from './components/view-document-manager/view-document-manager.component';
import { ViewDocumentManagerWindowContainer } from './containers/view-document-manager-window.container';
import { ViewDocumentManagerHeaderComponent } from './components/view-document-manager-header/view-document-manager-header.component';
import { ViewDocumentManagerCanvasComponent } from './components/view-document-manager-canvas/view-document-manager-canvas.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    PdfViewerModule,
    StoreModule.forFeature('checklist', checklistReducerMap, {
      initialState: initialChecklistState
    }),
    EffectsModule.forFeature([ChecklistEffects])
  ],
  declarations: [
    ChecklistManagerContainer,
    ChecklistItemComponent,
    DocumentManagerComponent,
    DocumentManagerHeaderComponent,
    DocumentManagerPagesComponent,
    DocumentManagerCanvasComponent,
    CanvasMenuComponent,
    PdfViewerComponent,
    PinchZoomComponent,
    DocumentManagerWindowContainer,
    ViewChecklistItemComponent,
    ViewChecklistManagerContainer,
    ViewDocumentManagerComponent,
    ViewDocumentManagerWindowContainer,
    ViewDocumentManagerHeaderComponent,
    ViewDocumentManagerCanvasComponent
  ],
  exports: [
    ChecklistManagerContainer,
    ChecklistItemComponent,
    DocumentManagerComponent,
    DocumentManagerHeaderComponent,
    DocumentManagerPagesComponent,
    DocumentManagerCanvasComponent,
    CanvasMenuComponent,
    PdfViewerComponent,
    PinchZoomComponent,
    DocumentManagerWindowContainer,
    ViewChecklistItemComponent,
    ViewChecklistManagerContainer,
    ViewDocumentManagerWindowContainer,
    ViewDocumentManagerHeaderComponent,
    ViewDocumentManagerCanvasComponent
  ]
})
export class ChecklistModule {}
