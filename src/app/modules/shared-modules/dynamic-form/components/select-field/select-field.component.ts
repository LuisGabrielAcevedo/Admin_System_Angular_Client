import { Type } from "@angular/core";
import {
  IDynamicFormField,
  IDynamicFormMaterialData,
  IDynamicFormModel
} from "../../dynamic-form.interfaces";
import { FormGroup } from "@angular/forms";

export class IDynamicFormFieldComponent {
  constructor(
    public component: Type<any>,
    public field: IDynamicFormField,
    public materialData: IDynamicFormMaterialData,
    public form: FormGroup,
    public model: IDynamicFormModel
  ) {}
}
