import {
  FormField,
  FormFieldTypes
} from "src/app/components/sharedComponents/dynamic-form/dynamic-form.interfaces";

const carSaleFields: FormField[] = [
  {
    name: "Engine",
    key: "engine",
    component: FormFieldTypes.textField
  },
  {
    name: "Chassis",
    key: "chassis",
    component: FormFieldTypes.textField
  }
];

export default carSaleFields;
