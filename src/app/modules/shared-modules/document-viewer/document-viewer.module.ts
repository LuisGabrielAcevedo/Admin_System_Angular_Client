import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DocumentViewerComponent } from "./document-viewer.component";
import { DocumentViewerHeaderComponent } from "./components/document-viewer-header/document-viewer-header.component";
import { DocumentViewerPagesComponent } from "./components/document-viewer-pages/document-viewer-pages.component";
import { DocumentViewerCanvasComponent } from "./components/document-viewer-canvas/document-viewer-canvas.component";
import { DocumentViewerCanvasButtonsComponent } from "./components/document-viewer-canvas-buttons/document-viewer-canvas-buttons.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatToolbarModule, MatIconModule } from "@angular/material";
import { ScrollingModule } from "@angular/cdk/scrolling";

@NgModule({
  declarations: [
    DocumentViewerComponent,
    DocumentViewerHeaderComponent,
    DocumentViewerPagesComponent,
    DocumentViewerCanvasComponent,
    DocumentViewerCanvasButtonsComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatIconModule,
    ScrollingModule
  ],
  exports: [DocumentViewerComponent]
})
export class DocumentViewerModule {}
