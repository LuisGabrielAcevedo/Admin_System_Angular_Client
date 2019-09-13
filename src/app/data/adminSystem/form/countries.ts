import { FormField, FormFieldTypes } from 'src/app/components/sharedComponents/dynamic-form/dynamic-form.interfaces';
import { DynamicFormValidators } from 'src/app/components/sharedComponents/dynamic-form/validate/dynamic-form-validators';
import { of } from 'rxjs';

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
        key: 'nameInitials',
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
        name: 'Language',
        key: 'language',
        component: FormFieldTypes.enum,
        validators: [
            DynamicFormValidators.required()
        ],
        options: {
            fieldOptions: () => of([
                { text: 'Spanish', value: 'es' },
                { text: 'English', value: 'en' }
            ])
        },
        flexConfig: {
            row: 2,
            flex: 50
        }
    },
    {
        name: 'Currency',
        key: 'currency',
        component: FormFieldTypes.enum,
        validators: [
            DynamicFormValidators.required()
        ],
        options: {
            fieldOptions: () => of([
                { text: 'BS S', value: 'BS S' },
                { text: 'AR $', value: 'AR $' }
            ])
        },
        flexConfig: {
            row: 3,
            flex: 50
        }
    }
];
export default countryFields;