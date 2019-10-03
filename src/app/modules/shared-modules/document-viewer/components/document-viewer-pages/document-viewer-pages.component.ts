import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { DocumentViewerThumbnail } from "../../document-viewer.interfaces";
import { Subscription, Observable, fromEvent } from "rxjs";
import { filter, map } from "rxjs/operators";

@Component({
  selector: "app-document-viewer-pages",
  templateUrl: "./document-viewer-pages.component.html",
  styleUrls: ["./document-viewer-pages.component.css"]
})
export class DocumentViewerPagesComponent implements OnInit {
  @Input() public thumbnailList: DocumentViewerThumbnail[] = [];
  @Input() public currentPage: number = 0;
  @Output() setCurrentPage: EventEmitter<number> = new EventEmitter();
  public subscriptions: Subscription[] = [];
  public keyDowns: Observable<number>;
  constructor() {
    this.keyDowns = fromEvent(document, "keydown").pipe(
      filter((event: KeyboardEvent) => [38, 40].includes(event.keyCode)),
      map(event => event.keyCode)
    );
  }

  ngOnInit() {
    this.subscriptions.push(
      this.keyDowns.subscribe(key => {
        if (key === 40 && this.currentPage + 1 <= this.thumbnailList.length) {
          this.selectNewPage(this.currentPage + 1);
        }
        if (key === 38 && this.currentPage - 1 > 0) {
          this.selectNewPage(this.currentPage - 1);
        }
      })
    );
  }

  public selectNewPage(page: number) {
    this.setCurrentPage.emit(page);
  }
}
