import { Component, OnInit } from "@angular/core";
import {
  IDynamicTableHeader,
  IDynamicTableButton,
  IDynamicTableItem
} from "src/app/modules/shared-modules/table/table.interfaces";
import { mercadoLibreHeaders } from "src/app/metadata/examples/mercado-libre";
import { MercadoLibreBaseModel } from "src/app/models/examples/mercado-libre/base-model/base-model";
import MercadolibreItem from "src/app/models/examples/mercado-libre/items";
import { DocumentViewerThumbnail } from "src/app/modules/shared-modules/document-viewer/document-viewer.interfaces";

@Component({
  selector: "app-mercado-libre",
  templateUrl: "./mercado-libre.component.html",
  styleUrls: ["./mercado-libre.component.css"]
})
export class MercadoLibreComponent implements OnInit {
  public title: string = "Mercado libre";
  public data: IDynamicTableItem[] = [];
  public headers: IDynamicTableHeader[] = mercadoLibreHeaders;
  public loading: boolean = false;
  public documentViewerStatus: boolean = false;
  public rowActions: IDynamicTableButton[] = [];
  public pictures: DocumentViewerThumbnail[] = [];
  constructor() {}

  ngOnInit() {
    this.loadProducts("guitarras");
  }

  loadProducts(value?: string) {
    this.loading = true;
    MercadoLibreBaseModel.url("sites/MLA/search")
      .option("q", value)
      .findRx()
      .subscribe(resp => {
        this.data = resp.results;
        this.loading = false;
        this.loadItem();
      });
  }

  loadItem(): void {
    MercadolibreItem.findByIdRx("MLA632558971").subscribe(item => {
      this.pictures = [];
      if (item.pictures.length) {
        item.pictures.forEach(picture => {
          this.pictures.push({
            url: picture.url
          });
        });
        this.documentViewerStatus = true;
      }
    });
  }

  closeDocumentViewer(): void {
    this.documentViewerStatus = false;
  }
}
