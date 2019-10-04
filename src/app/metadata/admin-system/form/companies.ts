import {
  IDynamicFormField,
  EDynamicFormFieldTypes
} from "src/app/modules/shared-modules/dynamic-form/dynamic-form.interfaces";
import { DynamicFormValidators } from "src/app/modules/shared-modules/dynamic-form/validate/dynamic-form-validators";
import Country from "src/app/models/admin-system/countries";
import { map } from "rxjs/operators";
import Application from "src/app/models/admin-system/applications";
import User from "src/app/models/admin-system/users";
import { of } from "rxjs";

const companyAspects: IDynamicFormField[] = [
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
  },
  {
    name: "Application",
    key: "application",
    component: EDynamicFormFieldTypes.autocomplete,
    validators: [DynamicFormValidators.required()],
    options: {
      fieldOptions: () => Application.findRx().pipe(map(resp => resp.data)),
      associationValue: "_id",
      associationText: "name"
    },
    flexConfig: {
      row: 2,
      flex: 50
    }
  },
  {
    name: "Admin",
    key: "admin",
    component: EDynamicFormFieldTypes.autocomplete,
    options: {
      fieldOptions: arg =>
        User.filter("company", arg)
          .findRx()
          .pipe(map(resp => resp.data)),
      visibleCondition: arg => arg._id,
      associationValue: "_id",
      associationText: "firstName",
      depend: "_id"
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
        of([{ text: "BS S", value: "BS S" }, { text: "AR $", value: "AR $" }]),
      multiple: true
    },
    flexConfig: {
      row: 3,
      flex: 50
    }
  }
];
export default companyAspects;
