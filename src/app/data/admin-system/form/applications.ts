import { FormField, FormFieldTypes } from 'src/app/components/sharedComponents/dynamic-form/dynamic-form.interfaces';
import { DynamicFormValidators } from 'src/app/components/sharedComponents/dynamic-form/validate/dynamic-form-validators';

const applicationAspects: FormField[] = [
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
        },
        options: {
            disableCondition: (arg) =>  arg._id
        }
    },
    {
        name: 'Code',
        key: 'code',
        component: FormFieldTypes.textField,
        validators: [
            DynamicFormValidators.required()
        ],
        flexConfig: {
            row: 1,
            flex: 50
        },
        options: {
            disableCondition: (arg) =>  arg._id
        }
    },
    {
        name: 'Description',
        key: 'description',
        component: FormFieldTypes.textarea
    }
];
export default applicationAspects;
