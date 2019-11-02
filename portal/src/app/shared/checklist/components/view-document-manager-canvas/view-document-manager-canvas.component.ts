import { Component, AfterViewInit, ViewChild, Input } from '@angular/core';
import { PinchZoomComponent } from '../pinch-zoom/pinch-zoom.component';
import { FileContent } from '../../models/file-content';

@Component({
  selector: 'app-view-document-manager-canvas',
  templateUrl: './view-document-manager-canvas.component.html',
  styleUrls: ['./view-document-manager-canvas.component.scss']
})
export class ViewDocumentManagerCanvasComponent implements AfterViewInit {
  private _zoomRate = 1;
  @ViewChild(PinchZoomComponent) pinchComponent: PinchZoomComponent;
  /* Inputs */
  @Input() fullContent: FileContent;
  @Input()
  zoomRate = 1;

  @Input() pdfSrc = '';

  @Input()
  originalSize = true;

  @Input()
  showAll = true;

  @Input()
  width = '500px';

  @Input()
  height = '500px';

  fitToPage = true;
  stickToPage = true;
  autoresize = false;
  // totalPages = 1;

  public zoom: number;
  public canvasImg;

  constructor() {}

  ngOnChanges(s) {
    if (this.fullContent && this.fullContent.content) {
      //const IMG_FORMAT = 'data:application/pdf;base64,';
      //this.canvasImg = IMG_FORMAT + this.fullContent.content;
      this.canvasImg = { data: atob(this.fullContent.content) };
    } else {
      this.canvasImg = null;
    }
  }

  ngAfterViewInit() {}
}
