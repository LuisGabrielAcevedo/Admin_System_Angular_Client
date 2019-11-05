import { Component, OnInit, Input } from "@angular/core";
import formatTextFn from "../utilities/format-text";
import { IDynamicTableItem } from "../table.interfaces";

@Component({
  selector: "app-table-item-information",
  templateUrl: "./table-item-information.component.html",
  styleUrls: ["./table-item-information.component.css"]
})
export class TableItemInformationComponent implements OnInit {
  @Input() public field: any;
  @Input() public item: IDynamicTableItem;
  dataFormated: string[] = null;
  show: boolean = null;

  ngOnInit() {
    this.formatText();
  }

  formatText() {
    const dataFormated: string[] = [];
    this.field.forEach(element => {
      const dataSplit = element.split("/b/");
      let text = formatTextFn(this.item, dataSplit[1]);
      text = text ? text : "Sin información";
      dataFormated.push(dataSplit[0] + " " + text);
    });
    this.dataFormated = dataFormated;
    this.show = true;
  }
}
