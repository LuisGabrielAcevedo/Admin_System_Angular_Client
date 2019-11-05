import { Component, OnInit, Input } from "@angular/core";
import formatTextFn from "../utilities/format-text";
import { IDynamicTableItem } from "../table.interfaces";

@Component({
  selector: "app-table-text",
  templateUrl: "./table-text.component.html",
  styleUrls: ["./table-text.component.css"]
})
export class TableTextComponent implements OnInit {
  @Input() public field: string;
  @Input() public item: IDynamicTableItem;
  public text = "";

  ngOnInit() {
    this.formatText();
  }

  formatText() {
    let text = formatTextFn(this.item, this.field);
    text = text ? text : "--";
    this.text = text.length > 22 ? `${text.substr(0, 22)}...` : text;
  }
}
