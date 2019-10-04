import {
  IDynamicFormField,
  EDynamicFormFieldTypes
} from "src/app/modules/shared-modules/dynamic-form/dynamic-form.interfaces";
import { DynamicFormValidators } from "src/app/modules/shared-modules/dynamic-form/validate/dynamic-form-validators";
import AdminSystem from "src/app/models/admin-system/admin-system";
import { map, tap } from "rxjs/operators";

const countryFields: IDynamicFormField[] = [
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
    name: "Capital",
    key: "capital",
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
    name: "Languages",
    key: "languages",
    component: EDynamicFormFieldTypes.enum,
    validators: [DynamicFormValidators.required()],
    options: {
      fieldOptions: () =>
        AdminSystem.urlParam("languages")
          .findRx()
          .pipe(
            map(resp =>
              resp.data.map(item => {
                return {
                  text: item.name,
                  value: item.id
                };
              })
            )
          ),
      multiple: true
    },
    flexConfig: {
      row: 2,
      flex: 50
    }
  },
  {
    name: "Currencies",
    key: "currencies",
    component: EDynamicFormFieldTypes.enum,
    validators: [DynamicFormValidators.required()],
    options: {
      fieldOptions: () =>
        AdminSystem.urlParam("currencies")
          .findRx()
          .pipe(
            map(resp =>
              resp.data.map(item => {
                return {
                  text: item.symbol,
                  value: item.id
                };
              })
            )
          ),
      multiple: true
    },
    flexConfig: {
      row: 3,
      flex: 50
    }
  }
];
export default countryFields;
