import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { DocumentViewerThumbnail } from "./document-viewer.interfaces";

@Component({
  selector: "app-document-viewer",
  templateUrl: "./document-viewer.component.html",
  styleUrls: ["./document-viewer.component.css"]
})
export class DocumentViewerComponent implements OnInit {
  @Input() public title: string;
  @Input() public opened: boolean;
  @Input() public thumbnailList: DocumentViewerThumbnail[];
  @Input() public currentPage: number = 1;
  @Output() public close: EventEmitter<any> = new EventEmitter();
  constructor() {}

  ngOnInit() {}

  public setCurrentPage(page: number) {
    this.currentPage = page;
  }

  public closeDocumentViewer() {
    this.close.emit();
  }

  public zoomIn() {
    console.log("in");
  }

  public zoomOut() {
    console.log("out");
  }
}
