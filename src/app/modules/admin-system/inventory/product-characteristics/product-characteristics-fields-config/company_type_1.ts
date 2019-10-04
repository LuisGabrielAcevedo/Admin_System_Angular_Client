import {
  IDynamicFormField,
  EDynamicFormFieldTypes
} from "src/app/modules/shared-modules/dynamic-form/dynamic-form.interfaces";

const restaurantFields: IDynamicFormField[] = [
  {
    name: "Ingredients",
    key: "characteristics.ingredients",
    component: EDynamicFormFieldTypes.stringList,
    flexConfig: {
      row: 1,
      flex: 100,
      rowTitle: "Ingredients"
    },
    options: {
      placeholder: "write a ingredient",
      label: "Ingredient"
    }
  }
];

export default restaurantFields;
