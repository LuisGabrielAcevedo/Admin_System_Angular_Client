import {
  IDynamicFormField,
  EDynamicFormFieldTypes
} from "src/app/modules/shared-modules/dynamic-form/dynamic-form.interfaces";
import { DynamicFormValidators } from "src/app/modules/shared-modules/dynamic-form/validate/dynamic-form-validators";
import Country from "src/app/models/admin-system/countries";
import { map } from "rxjs/operators";

const stateFields: IDynamicFormField[] = [
  {
    name: "Name",
    key: "name",
    component: EDynamicFormFieldTypes.textField,
    validators: [DynamicFormValidators.required()],
    flexConfig: {
      row: 1,
      flex: 50
    }
  },
  {
    name: "Code",
    key: "code",
    component: EDynamicFormFieldTypes.textField,
    validators: [
      DynamicFormValidators.required(),
      DynamicFormValidators.onlyCapitalCase()
    ],
    flexConfig: {
      row: 2,
      flex: 50
    }
  },
  {
    name: "Country",
    key: "country",
    component: EDynamicFormFieldTypes.autocomplete,
    validators: [DynamicFormValidators.required()],
    options: {
      fieldOptions: () => Country.findRx().pipe(map(resp => resp.data)),
      associationValue: "_id",
      associationText: "name"
    },
    flexConfig: {
      row: 1,
      flex: 50
    }
  }
];
export default stateFields;
