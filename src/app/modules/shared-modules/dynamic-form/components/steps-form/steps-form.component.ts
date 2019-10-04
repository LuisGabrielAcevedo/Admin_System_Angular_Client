import { Component, OnInit, Input } from "@angular/core";
import {
  IDynamicFormMainGroup,
  IDynamicFormMaterialData,
  IDynamicFormModel
} from "../../dynamic-form.interfaces";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "app-steps-form",
  templateUrl: "./steps-form.component.html",
  styleUrls: ["./steps-form.component.css"]
})
export class StepsFormComponent implements OnInit {
  @Input() public mainGroups: IDynamicFormMainGroup[];
  @Input() public form: FormGroup;
  @Input() public materialData: IDynamicFormMaterialData;
  @Input() public model: IDynamicFormModel;
  constructor() {}

  ngOnInit() {}
}
