import { Component, OnInit, Input } from "@angular/core";
import {
  IDynamicFormField,
  IDynamicFormMaterialData,
  IDynamicFormModel
} from "../../dynamic-form.interfaces";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "app-row",
  templateUrl: "./row.component.html",
  styleUrls: ["./row.component.css"]
})
export class RowComponent implements OnInit {
  @Input() public fields: IDynamicFormField[];
  @Input() public form: FormGroup;
  @Input() public materialData: IDynamicFormMaterialData;
  @Input() public model: IDynamicFormModel;
  public rowTitle: string = null;
  constructor() {}

  ngOnInit() {
    this.fields.forEach(field => {
      if (field.flexConfig && field.flexConfig.rowTitle)
        this.rowTitle = field.flexConfig!.rowTitle!;
    });
  }
}
