import {
  IDynamicFormField,
  EDynamicFormFieldTypes
} from "src/app/modules/shared-modules/dynamic-form/dynamic-form.interfaces";
import { DynamicFormValidators } from "src/app/modules/shared-modules/dynamic-form/validate/dynamic-form-validators";
import Country from "src/app/models/admin-system/countries";
import { map } from "rxjs/operators";
import Application from "src/app/models/admin-system/applications";
import Company from "src/app/models/admin-system/companies";

const storeAspects: IDynamicFormField[] = [
  {
    name: "Name",
    key: "name",
    mainGroup: "Basic info",
    component: EDynamicFormFieldTypes.textField,
    validators: [DynamicFormValidators.required()],
    flexConfig: {
      row: 1,
      flex: 50
    }
  },
  {
    name: "Description",
    key: "description",
    mainGroup: "Basic info",
    component: EDynamicFormFieldTypes.textField,
    flexConfig: {
      row: 1,
      flex: 50
    }
  },
  {
    name: "Application",
    key: "application",
    mainGroup: "Basic info",
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
    name: "Company",
    key: "company",
    mainGroup: "Basic info",
    component: EDynamicFormFieldTypes.autocomplete,
    validators: [DynamicFormValidators.required()],
    options: {
      fieldOptions: () => Company.findRx().pipe(map(resp => resp.data)),
      associationValue: "_id",
      associationText: "name"
    },
    flexConfig: {
      row: 2,
      flex: 50
    }
  },
  {
    name: "Country",
    key: "country",
    component: EDynamicFormFieldTypes.autocomplete,
    mainGroup: "Location",
    validators: [DynamicFormValidators.required()],
    options: {
      fieldOptions: () => Country.findRx().pipe(map(resp => resp.data)),
      associationValue: "_id",
      associationText: "name"
    },
    flexConfig: {
      row: 1,
      flex: 35,
      rowTitle: "Country"
    }
  },
  {
    name: "State",
    key: "state",
    component: EDynamicFormFieldTypes.autocomplete,
    mainGroup: "Location",
    flexConfig: {
      row: 1,
      flex: 35
    }
  },
  {
    name: "City",
    key: "city",
    mainGroup: "Location",
    component: EDynamicFormFieldTypes.textField,
    flexConfig: {
      row: 1,
      flex: 30
    }
  },
  {
    name: "Street",
    key: "address.street",
    mainGroup: "Location",
    component: EDynamicFormFieldTypes.textField,
    flexConfig: {
      row: 2,
      flex: 35
    }
  },
  {
    name: "Number",
    key: "address.number",
    mainGroup: "Location",
    component: EDynamicFormFieldTypes.textField,
    flexConfig: {
      row: 2,
      flex: 35,
      rowTitle: "Address"
    }
  },
  {
    name: "Floor",
    key: "address.floor",
    mainGroup: "Location",
    component: EDynamicFormFieldTypes.textField,
    flexConfig: {
      row: 2,
      flex: 15
    }
  },
  {
    name: "Department/Office",
    key: "address.department",
    mainGroup: "Location",
    component: EDynamicFormFieldTypes.textField,
    flexConfig: {
      row: 2,
      flex: 15
    }
  },
  {
    name: "Phone",
    key: "phone",
    mainGroup: "Location",
    component: EDynamicFormFieldTypes.textField,
    flexConfig: {
      row: 3,
      flex: 35,
      rowTitle: "Phone"
    }
  }
];

export default storeAspects;
