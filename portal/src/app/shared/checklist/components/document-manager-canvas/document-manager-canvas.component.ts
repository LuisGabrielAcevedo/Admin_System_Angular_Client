import {
  Component,
  OnInit,
  Input,
  OnChanges,
  ViewChild,
  AfterViewInit,
  SimpleChange
} from '@angular/core';
import { CurrentPage } from '../document-manager/api/documentManager';
import { PinchZoomComponent } from '../pinch-zoom/pinch-zoom.component';

@Component({
  selector: 'app-document-manager-canvas',
  templateUrl: './document-manager-canvas.component.html',
  styleUrls: ['./document-manager-canvas.component.scss']
})
export class DocumentManagerCanvasComponent
  implements OnInit, OnChanges, AfterViewInit {
  private _zoomRate = 1;
  @ViewChild(PinchZoomComponent) pinchComponent: PinchZoomComponent;
  /* Inputs */
  @Input() currentPage: CurrentPage;
  @Input()
  zoomRate = 1;
  // get zoomRate() {
  //   return this._zoomRate;
  // }
  // set zoomRate(zoom: number) {
  //   console.log(zoom);
  //   this._zoomRate = zoom;
  //   if (this.pinchComponent && this.pinchComponent.element) {
  //     this.pinchComponent.transformElement();
  //   }
  // }

  @Input() pdfSrc = '';

  @Input()
  originalSize = true;

  @Input()
  showAll = false;

  @Input()
  width = '500px';

  @Input()
  height = '500px';

  fitToPage = true;
  stickToPage = true;
  autoresize = false;
  totalPages = 1;

  public zoom: number;
  public canvasImg;

  constructor() {}

  ngOnInit() {}
  ngOnChanges(s) {
    if (
      this.currentPage &&
      this.currentPage.documentPage &&
      this.currentPage.documentPage.content
    ) {
      //const IMG_FORMAT = 'data:application/pdf;base64,';
      //this.canvasImg = IMG_FORMAT + this.currentPage.documentPage.content;
      this.canvasImg = { data: atob(this.currentPage.documentPage.content) };
    } else {
      this.canvasImg = null;
    }
  }

  ngAfterViewInit() {}
}
