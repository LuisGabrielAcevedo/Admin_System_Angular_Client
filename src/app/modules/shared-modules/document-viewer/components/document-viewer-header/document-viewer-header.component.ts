import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-document-viewer-header",
  templateUrl: "./document-viewer-header.component.html",
  styleUrls: ["./document-viewer-header.component.css"]
})
export class DocumentViewerHeaderComponent implements OnInit {
  @Input() public title: string;
  constructor() {}

  ngOnInit() {}
}
