import {
  IDynamicFormField,
  EDynamicFormFieldTypes
} from "src/app/modules/shared-modules/dynamic-form/dynamic-form.interfaces";

const musicalInstrumentsFields: IDynamicFormField[] = [
  {
    name: "Color",
    key: "characteristics.color",
    component: EDynamicFormFieldTypes.textField
  }
];

export default musicalInstrumentsFields;
