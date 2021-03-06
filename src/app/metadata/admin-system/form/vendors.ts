import { IDynamicFormField, EDynamicFormFieldTypes } from "src/app/modules/shared-modules/dynamic-form/dynamic-form.interfaces";
import { DynamicFormValidators } from 'src/app/modules/shared-modules/dynamic-form/validate/dynamic-form-validators';
import Company from 'src/app/models/admin-system/companies';
import { map } from 'rxjs/operators';
import Country from 'src/app/models/admin-system/countries';
import State from 'src/app/models/admin-system/states';

const vendorFields: IDynamicFormField[] = [
    {
        name: 'Company',
        key: 'company',
        component: EDynamicFormFieldTypes.asyncAutocomplete,
        mainGroup: 'App info',
        flexConfig: {
            row: 1,
            flex: 100
        },
        validators: [
            DynamicFormValidators.required()
        ],
        options: {
            placeholder: 'Select a company',
            fieldOptions: (arg) => Company.option('search', arg).findRx().pipe(map(resp => resp.data)),
            associationText: 'name',
            associationValue: '_id'
        }
    },
    {
        name: 'Name',
        key: 'name',
        component: EDynamicFormFieldTypes.textField,
        mainGroup: 'Contact',
        flexConfig: {
            row: 1,
            flex: 35
        },
        validators: [
            DynamicFormValidators.required()
        ]
    },
    {
        name: 'Email',
        key: 'email',
        component: EDynamicFormFieldTypes.textField,
        mainGroup: 'Contact',
        flexConfig: {
            row: 1,
            flex: 35
        },
        validators: [
            DynamicFormValidators.required(),
            DynamicFormValidators.email()
        ]
    },
    {
        name: 'Phone',
        key: 'phone',
        component: EDynamicFormFieldTypes.textField,
        mainGroup: 'Contact',
        flexConfig: {
            row: 1,
            flex: 30
        },
        validators: [
            DynamicFormValidators.required()
        ]
    },
    {
        name: 'Country',
        key: 'country',
        component: EDynamicFormFieldTypes.autocomplete,
        mainGroup: 'Contact',
        validators: [
            DynamicFormValidators.required()
        ],
        options: {
            fieldOptions: () => Country.findRx().pipe(map(resp => resp.data)),
            associationValue: '_id',
            associationText: 'name'
        },
        flexConfig: {
            row: 2,
            flex: 35
        }
    },
    {
        name: 'State',
        key: 'state',
        component: EDynamicFormFieldTypes.autocomplete,
        mainGroup: 'Contact',
        validators: [
            DynamicFormValidators.required()
        ],
        options: {
            fieldOptions: () => State.findRx().pipe(map(resp => resp.data)),
            associationValue: '_id',
            associationText: 'name'
        },
        flexConfig: {
            row: 2,
            flex: 35
        }
    },
    {
        name: 'City',
        key: 'city',
        mainGroup: 'Contact',
        component: EDynamicFormFieldTypes.textField,
        validators: [
            DynamicFormValidators.required()
        ],
        flexConfig: {
            row: 2,
            flex: 30
        }
    },
    {
        name: 'Postal code',
        key: 'zip',
        mainGroup: 'Contact',
        component: EDynamicFormFieldTypes.textField,
        flexConfig: {
            row: 3,
            flex: 35
        }
    },
    {
        name: 'Company name',
        key: 'companyName',
        component: EDynamicFormFieldTypes.textField,
        mainGroup: 'Company',
        flexConfig: {
            row: 1,
            flex: 35
        },
        validators: [
            DynamicFormValidators.required()
        ]
    },
    {
        name: 'Company email',
        key: 'companyEmail',
        component: EDynamicFormFieldTypes.textField,
        mainGroup: 'Company',
        flexConfig: {
            row: 1,
            flex: 35
        },
        validators: [
            DynamicFormValidators.required(),
            DynamicFormValidators.email()
        ]
    },
    {
        name: 'Company phone',
        key: 'companyPhone',
        component: EDynamicFormFieldTypes.textField,
        mainGroup: 'Company',
        flexConfig: {
            row: 1,
            flex: 30
        },
        validators: [
            DynamicFormValidators.required()
        ]
    },
    {
        name: 'Website',
        key: 'companyWebsite',
        component: EDynamicFormFieldTypes.textField,
        mainGroup: 'Company',
        flexConfig: {
            row: 2,
            flex: 100
        },
        validators: [
            DynamicFormValidators.required()
        ]
    },
    {
        name: 'Street',
        key: 'companyAddress.street',
        mainGroup: 'Company',
        component: EDynamicFormFieldTypes.textField,
        flexConfig: {
            row: 3,
            flex: 35
        }
    },
    {
        name: 'Number',
        key: 'companyAddress.number',
        mainGroup: 'Company',
        component: EDynamicFormFieldTypes.textField,
        flexConfig: {
            row: 3,
            flex: 35,
            rowTitle: 'Address'
        }
    },
    {
        name: 'Floor',
        key: 'companyAddress.floor',
        mainGroup: 'Company',
        component: EDynamicFormFieldTypes.textField,
        flexConfig: {
            row: 3,
            flex: 15
        }
    },
    {
        name: 'Department/Office',
        key: 'companyAddress.office',
        mainGroup: 'Company',
        component: EDynamicFormFieldTypes.textField,
        flexConfig: {
            row: 3,
            flex: 15
        }
    },
];

export default vendorFields;