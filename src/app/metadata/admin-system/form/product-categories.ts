import { FormField, FormFieldTypes } from "src/app/modules/shared-modules/dynamic-form/dynamic-form.interfaces";
import { DynamicFormValidators } from 'src/app/modules/shared-modules/dynamic-form/validate/dynamic-form-validators';
import Company from 'src/app/models/admin-system/companies';
import { map } from 'rxjs/operators';

const productCategoryFields: FormField[] = [
    {
        name: 'Company',
        key: 'company',
        component: FormFieldTypes.asyncAutocomplete,
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
        component: FormFieldTypes.textField,
        flexConfig: {
            row: 2,
            flex: 100
        },
        validators: [
            DynamicFormValidators.required()
        ]
    }
];

export default productCategoryFields;