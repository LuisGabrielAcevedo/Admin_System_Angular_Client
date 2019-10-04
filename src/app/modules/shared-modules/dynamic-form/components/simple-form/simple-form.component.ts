import { Component, OnInit, Input } from "@angular/core";
import {
  IDynamicFormMainGroup,
  IDynamicFormMaterialData,
  IDynamicFormModel
} from "../../dynamic-form.interfaces";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "app-simple-form",
  templateUrl: "./simple-form.component.html",
  styleUrls: ["./simple-form.component.css"]
})
export class SimpleFormComponent implements OnInit {
  @Input() public mainGroups: IDynamicFormMainGroup[];
  @Input() public form: FormGroup;
  @Input() public materialData: IDynamicFormMaterialData;
  @Input() public model: IDynamicFormModel;
  constructor() {}

  ngOnInit() {}
}
