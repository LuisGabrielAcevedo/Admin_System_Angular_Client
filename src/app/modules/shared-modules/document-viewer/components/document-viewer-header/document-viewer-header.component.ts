import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-document-viewer-header",
  templateUrl: "./document-viewer-header.component.html",
  styleUrls: ["./document-viewer-header.component.css"]
})
export class DocumentViewerHeaderComponent implements OnInit {
  @Input() public title: string;
  @Output() public closeDocumentViewerEvent: EventEmitter<
    any
  > = new EventEmitter();
  constructor() {}

  ngOnInit() {}

  public closeDocumentViewer() {
    this.closeDocumentViewerEvent.emit();
  }
}
