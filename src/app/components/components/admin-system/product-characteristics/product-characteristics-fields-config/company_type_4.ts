import {
  FormField,
  FormFieldTypes
} from "src/app/components/sharedComponents/dynamic-form/dynamic-form.interfaces";

const carSaleFields: FormField[] = [
  {
    name: "Engine",
    key: "characteristics.engine",
    component: FormFieldTypes.textField,
    flexConfig: {
      row: 1,
      flex: 50
    }
  },
  {
    name: "Chassis",
    key: "characteristics.chassis",
    component: FormFieldTypes.textField,
    flexConfig: {
      row: 1,
      flex: 50
    }
  },
  {
    name: "Power",
    key: "characteristics.power",
    component: FormFieldTypes.textField,
    flexConfig: {
      row: 2,
      flex: 50
    }
  }
];

export default carSaleFields;
