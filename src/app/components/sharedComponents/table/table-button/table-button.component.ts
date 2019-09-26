import { Component, OnInit, Input } from "@angular/core";
import { DynamicTableButtonAction } from "../table.interfaces";
import { TableService } from "../table.service";

@Component({
  selector: "app-table-button",
  templateUrl: "./table-button.component.html",
  styleUrls: ["./table-button.component.css"]
})
export class TableButtonComponent implements OnInit {
  @Input() field: string | string[];
  @Input() item: object;
  @Input() position: number;
  @Input() button: DynamicTableButtonAction;
  constructor(private tableService: TableService) {}

  ngOnInit() {}

  disabledButton(button: DynamicTableButtonAction) {
    return button.disabled ? button.disabled(this.item) : false;
  }

  buttonActions() {
    this.tableService.buttonActions(this.button, this.position, this.item);
  }
}
