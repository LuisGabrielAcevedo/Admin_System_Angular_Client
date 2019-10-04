import {
  IDynamicFormField,
  EDynamicFormFieldTypes
} from "src/app/modules/shared-modules/dynamic-form/dynamic-form.interfaces";
import { DynamicFormValidators } from "src/app/modules/shared-modules/dynamic-form/validate/dynamic-form-validators";

const applicationAspects: IDynamicFormField[] = [
  {
    name: "Name",
    key: "name",
    component: EDynamicFormFieldTypes.textField,
    validators: [DynamicFormValidators.required()],
    flexConfig: {
      row: 1,
      flex: 50
    },
    options: {
      disableCondition: arg => arg._id
    }
  },
  {
    name: "Code",
    key: "code",
    component: EDynamicFormFieldTypes.textField,
    validators: [DynamicFormValidators.required()],
    flexConfig: {
      row: 1,
      flex: 50
    },
    options: {
      disableCondition: arg => arg._id
    }
  },
  {
    name: "Description",
    key: "description",
    component: EDynamicFormFieldTypes.textarea
  }
];
export default applicationAspects;
