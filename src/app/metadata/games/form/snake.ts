import {
  IDynamicFormField,
  EDynamicFormFieldTypes
} from "src/app/modules/shared-modules/dynamic-form/dynamic-form.interfaces";
import { DynamicFormValidators } from "src/app/modules/shared-modules/dynamic-form/validate/dynamic-form-validators";

const snakeFields: IDynamicFormField[] = [
  // {
  //   name: "Cell size(px)",
  //   key: "cellSize",
  //   defaultValue: 10,
  //   component: EDynamicFormFieldTypes.numericField,
  //   validators: [
  //     DynamicFormValidators.required(),
  //     DynamicFormValidators.min(10),
  //     DynamicFormValidators.max(30)
  //   ]
  // },
  // {
  //   name: "Board size(px)",
  //   key: "boardSize",
  //   defaultValue: 30,
  //   component: EDynamicFormFieldTypes.numericField,
  //   validators: [
  //     DynamicFormValidators.required(),
  //     DynamicFormValidators.min(10),
  //     DynamicFormValidators.max(30)
  //   ]
  // },
  {
    name: "Speed",
    key: "speed",
    defaultValue: 10,
    component: EDynamicFormFieldTypes.numericField,
    validators: [DynamicFormValidators.required()]
  }
];

export default snakeFields;
