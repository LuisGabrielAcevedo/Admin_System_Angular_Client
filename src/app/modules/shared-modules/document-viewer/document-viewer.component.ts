import { Component, OnInit, Input } from "@angular/core";
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
  @Input() public currentPage: number = 8;
  constructor() {}

  ngOnInit() {}

  public setCurrentPage(page: number) {
    this.currentPage = page;
  }
}
