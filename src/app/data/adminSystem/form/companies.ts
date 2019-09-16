import { FormField, FormFieldTypes } from 'src/app/components/sharedComponents/dynamic-form/dynamic-form.interfaces';
import { DynamicFormValidators } from 'src/app/components/sharedComponents/dynamic-form/validate/dynamic-form-validators';
import Country from 'src/app/models/adminSystem/countries';
import { map } from 'rxjs/operators';
import Application from 'src/app/models/adminSystem/applications';
import User from 'src/app/models/adminSystem/users';
import { of } from 'rxjs';

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
        component: FormFieldTypes.autocomplete,
        validators: [
            DynamicFormValidators.required()
        ],
        options: {
            fieldOptions: () => Country.findRx().pipe(map(resp => resp.data)),
            associationValue: '_id',
            associationText: 'name'
        },
        flexConfig: {
            row: 1,
            flex: 50
        }
    },
    {
        name: 'Application',
        key: 'application',
        component: FormFieldTypes.autocomplete,
        validators: [
            DynamicFormValidators.required()
        ],
        options: {
            fieldOptions: () => Application.findRx().pipe(map(resp => resp.data)),
            associationValue: '_id',
            associationText: 'name'
        },
        flexConfig: {
            row: 2,
            flex: 50
        }
    },
    {
        name: 'Admin',
        key: 'admin',
        component: FormFieldTypes.autocomplete,
        options: {
            fieldOptions: (arg) => User.where('company', arg).findRx().pipe(map(resp => resp.data)),
            associationValue: '_id',
            associationText: 'firstName',
            depend: '_id'
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
            fieldOptions: () => of([
                { text: 'BS S', value: 'BS S' },
                { text: 'AR $', value: 'AR $' }
            ]),
            multiple: true
        },
        flexConfig: {
            row: 3,
            flex: 50
        }
    }
];
export default companyAspects;
