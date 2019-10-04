import { Component, OnInit, Input } from "@angular/core";
import {
  IDynamicFormModel,
  IDynamicFormField,
  IDynamicFormMaterialData
} from "src/app/modules/shared-modules/dynamic-form/dynamic-form.interfaces";
import { FormGroup } from "@angular/forms";
import Store from "src/app/models/admin-system/stores";

@Component({
  selector: "app-product-prices",
  templateUrl: "./product-prices.component.html",
  styleUrls: ["./product-prices.component.css"]
})
export class ProductPricesComponent implements OnInit {
  public currentModel: IDynamicFormModel;
  @Input() public field: IDynamicFormField;
  @Input() public form: FormGroup;
  @Input() public materialData: IDynamicFormMaterialData;
  @Input() set model(model: IDynamicFormModel) {
    this.currentModel = model;
  }
  constructor() {}

  ngOnInit() {}
}
