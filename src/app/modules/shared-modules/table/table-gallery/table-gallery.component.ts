import { Component, OnInit, Input, ViewEncapsulation } from "@angular/core";
import { Observable } from "rxjs";
import { IDynamicTableGalleryConfig } from "../table.interfaces";
import formatTextFn from "../utilities/format-text";

@Component({
  selector: "app-table-gallery",
  templateUrl: "./table-gallery.component.html",
  styleUrls: ["./table-gallery.component.css"],
  encapsulation: ViewEncapsulation.None
})
export class TableGalleryComponent implements OnInit {
  @Input() field: string | string[];
  @Input() item: object;
  @Input() observable: (...arg: any[]) => Observable<any>;
  @Input() galleryConfig: IDynamicTableGalleryConfig;
  public galleryLoading: boolean = null;
  public galleryList: object[] = null;

  ngOnInit() {
    this.loadList();
  }

  loadList() {
    this.galleryLoading = true;
    const observable = this.observable(this.item);
    observable.subscribe(resp => {
      this.galleryList = formatTextFn(resp, this.galleryConfig.galleryListData);
      this.galleryLoading = false;
    });
  }

  formatImage(item: object, field: string) {
    return formatTextFn(item, field);
  }

  formatText(item: object, field: string) {
    let text = formatTextFn(item, field);
    text = text ? text : "Sin información";
    return text.length > 18 ? `${text.substr(0, 18)}...` : text;
  }
}
