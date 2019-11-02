import { Component, OnInit, Input } from '@angular/core';

const ZOOM_STEP: number = 25;
const DEFAULT_ZOOM: number = 1;

@Component({
  selector: 'ui-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.scss']
})
export class PdfViewerComponent implements OnInit {
  @Input()
  pdfSrc = '';

  @Input()
  page = 1;

  @Input()
  originalSize = true;

  @Input()
  showAll = false;

  @Input()
  width = '700px';

  @Input() zoom = DEFAULT_ZOOM;
  fitToPage = false;
  stickToPage = true;
  autoresize = true;
  totalPages = 1;

  constructor() {}

  ngOnInit() {}

  goToNextPage() {
    this.page = this.page + 1;
  }
  goToPreviousPage() {
    this.page = this.page - 1;
  }
  enableFitPage() {
    this.fitToPage = !this.fitToPage;
    this.zoom = DEFAULT_ZOOM;
  }

  afterLoadComplete(event) {
    this.totalPages = event.numPages;
  }

  incrementZoom(amount: number) {
    this.zoom += amount;
  }
}
