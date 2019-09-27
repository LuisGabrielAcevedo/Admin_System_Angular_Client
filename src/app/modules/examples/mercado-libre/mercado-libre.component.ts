import { Component, OnInit } from "@angular/core";
import {
  DynamicTableHeader,
  DynamicTableButtonAction,
  DynamicTableItem
} from "src/app/modules/shared-modules/table/table.interfaces";
import { mercadoLibreHeaders } from "src/app/metadata/examples/mercado-libre";
import { MercadoLibreBaseModel } from "src/app/models/examples/mercado-libre/base-model";

@Component({
  selector: "app-mercado-libre",
  templateUrl: "./mercado-libre.component.html",
  styleUrls: ["./mercado-libre.component.css"]
})
export class MercadoLibreComponent implements OnInit {
  data: DynamicTableItem[] = [];
  headers: DynamicTableHeader[] = mercadoLibreHeaders;
  loading: boolean = false;
  rowActions: DynamicTableButtonAction[] = [];
  constructor() {}

  ngOnInit() {
    this.loadProducts("coldplay");
  }

  loadProducts(value?: string) {
    this.loading = true;
    MercadoLibreBaseModel.option("q", value)
      .findRx()
      .subscribe(resp => {
        this.data = resp.results;
        this.loading = false;
      });
  }
}
