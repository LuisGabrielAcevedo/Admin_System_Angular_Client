import {
  IDynamicFormField,
  EDynamicFormFieldTypes
} from "src/app/modules/shared-modules/dynamic-form/dynamic-form.interfaces";

const carSaleFields: IDynamicFormField[] = [
  {
    name: "Engine",
    key: "characteristics.engine",
    component: EDynamicFormFieldTypes.textField,
    flexConfig: {
      row: 1,
      flex: 50
    }
  },
  {
    name: "Chassis",
    key: "characteristics.chassis",
    component: EDynamicFormFieldTypes.textField,
    flexConfig: {
      row: 1,
      flex: 50
    }
  },
  {
    name: "Power",
    key: "characteristics.power",
    component: EDynamicFormFieldTypes.textField,
    flexConfig: {
      row: 2,
      flex: 50
    }
  }
];

export default carSaleFields;
