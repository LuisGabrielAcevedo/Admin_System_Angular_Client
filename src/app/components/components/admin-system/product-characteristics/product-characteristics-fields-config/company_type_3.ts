import {
  FormField,
  FormFieldTypes
} from "src/app/components/sharedComponents/dynamic-form/dynamic-form.interfaces";

const musicalInstrumentsFields: FormField[] = [
  {
    name: "Color",
    key: "characteristics.color",
    component: FormFieldTypes.textField
  }
];

export default musicalInstrumentsFields;
