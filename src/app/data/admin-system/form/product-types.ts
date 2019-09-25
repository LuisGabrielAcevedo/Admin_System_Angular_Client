import { FormField, FormFieldTypes } from "src/app/components/sharedComponents/dynamic-form/dynamic-form.interfaces";
import Company from 'src/app/models/admin-system/companies';
import { DynamicFormValidators } from 'src/app/components/sharedComponents/dynamic-form/validate/dynamic-form-validators';
import { map } from 'rxjs/operators';
import AdminSystem from 'src/app/models/admin-system/admin-system';

const productTypeFields: FormField[] = [
    {
        name: 'Company',
        key: 'company',
        component: FormFieldTypes.asyncAutocomplete,
        flexConfig: {
            row: 1,
            flex: 50
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
        component: FormFieldTypes.textField,
        flexConfig: {
            row: 1,
            flex: 50
        },
        validators: [
            DynamicFormValidators.required()
        ]
    }
];

export default productTypeFields;