import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-document-viewer-canvas-buttons",
  templateUrl: "./document-viewer-canvas-buttons.component.html",
  styleUrls: ["./document-viewer-canvas-buttons.component.css"]
})
export class DocumentViewerCanvasButtonsComponent implements OnInit {
  @Input() currentPage;
  @Input() totalPages;
  @Output() onZoomIn = new EventEmitter();
  @Output() onZoomOut = new EventEmitter();

  constructor() {}

  public zoomIn() {
    this.onZoomIn.emit();
  }
  public zoomOut() {
    this.onZoomOut.emit();
  }

  ngOnInit() {}
}
