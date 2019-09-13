import { FormField, FormFieldTypes } from 'src/app/components/sharedComponents/dynamic-form/dynamic-form.interfaces';
import { DynamicFormValidators } from 'src/app/components/sharedComponents/dynamic-form/validate/dynamic-form-validators';
import Country from 'src/app/models/adminSystem/countries';
import ObjectID from 'bson-objectid';
import { map } from 'rxjs/operators';

const companyAspects: FormField[] = [
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
        name: 'Country',
        key: 'country',
        component: FormFieldTypes.asyncAutocomplete,
        validators: [
            DynamicFormValidators.required()
        ],
        options: {
            fieldOptions: (arg) => Country.option('search', arg).findRx().pipe(map(resp => resp.data)),
            associationValue: '_id',
            associationText: 'name'
        },
        flexConfig: {
            row: 1,
            flex: 50
        }
    },
];
export default companyAspects;
