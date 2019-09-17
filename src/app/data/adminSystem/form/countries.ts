import { FormField, FormFieldTypes } from 'src/app/components/sharedComponents/dynamic-form/dynamic-form.interfaces';
import { DynamicFormValidators } from 'src/app/components/sharedComponents/dynamic-form/validate/dynamic-form-validators';
import AdminSystem from 'src/app/models/adminSystem/admin-system';
import { map, tap } from 'rxjs/operators';

const countryFields: FormField[] = [
    {
        name: 'Name',
        key: 'name',
        component: FormFieldTypes.textField,
        validators: [
            DynamicFormValidators.required()
        ],
        flexConfig: {
            row: 1,
            flex: 50
        }
    },
    {
        name: 'Capital',
        key: 'capital',
        component: FormFieldTypes.textField,
        validators: [
            DynamicFormValidators.required()
        ],
        flexConfig: {
            row: 1,
            flex: 50
        }
    },
    {
        name: 'Code',
        key: 'code',
        component: FormFieldTypes.textField,
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
        name: 'Languages',
        key: 'languages',
        component: FormFieldTypes.enum,
        validators: [
            DynamicFormValidators.required()
        ],
        options: {
            fieldOptions: () => AdminSystem.setUrl('languages').findRx().pipe(
                map(resp => resp.data.map(item => {
                    return {
                        text: item.name,
                        value: item.id
                    }
                }))
            ),
            multiple: true
        },
        flexConfig: {
            row: 2,
            flex: 50
        }
    },
    {
        name: 'Currencies',
        key: 'currencies',
        component: FormFieldTypes.enum,
        validators: [
            DynamicFormValidators.required()
        ],
        options: {
            fieldOptions: () => AdminSystem.setUrl('currencies').findRx().pipe(
                map(resp => resp.data.map(item => {
                    return {
                        text: item.symbol,
                        value: item.id
                    }
                }))
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