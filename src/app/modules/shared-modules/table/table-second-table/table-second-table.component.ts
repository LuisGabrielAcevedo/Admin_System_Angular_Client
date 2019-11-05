import { Component, OnInit, Input } from "@angular/core";
import { IDynamicTableSecondTableConfig } from "../table.interfaces";
import formatTextFn from "../utilities/format-text";
import { Observable } from "rxjs";

@Component({
  selector: "app-table-second-table",
  templateUrl: "./table-second-table.component.html",
  styleUrls: ["./table-second-table.component.css"]
})
export class TableSecondTableComponent implements OnInit {
  @Input() field: string;
  @Input() item: object;
  @Input() observable: (...arg: any[]) => Observable<any>;
  @Input() secondTableConfig: IDynamicTableSecondTableConfig;
  public secondTableLoading: boolean = null;
  public secondTableList: object[] = null;
  constructor() {}

  ngOnInit() {
    this.loadList();
  }

  loadList() {
    this.secondTableLoading = true;
    const observable = this.observable(this.item);
    observable.subscribe(resp => {
      this.secondTableList = formatTextFn(
        resp,
        this.secondTableConfig.secondTableListData
      );
      this.secondTableLoading = false;
    });
  }

  formatText(item: object, field: string) {
    let text = formatTextFn(item, field);
    text = text ? text : "--";
    return text.length > 18 ? `${text.substr(0, 18)}...` : text;
  }
}
