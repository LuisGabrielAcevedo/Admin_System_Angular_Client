import { FormField, FormFieldTypes } from 'src/app/components/sharedComponents/dynamic-form/dynamic-form.interfaces';
import Application from '../../models/adminSystem/applications';
import Role from '../../models/adminSystem/roles';
import Company from '../../models/adminSystem/companies';
import Store from '../../models/adminSystem/stores';
import ObjectID from 'bson-objectid';
import { DynamicFormValidators } from 'src/app/components/sharedComponents/dynamic-form/validate/dynamic-form-validators';

const userFields: FormField[] = [
    {
        name: 'Company',
        key: 'company',
        component: FormFieldTypes.autocomplete,
        mainGroup: 'App info',
        options: {
            row: 1,
            flex: 100,
            placeholder: 'Select a company',
            selectOptions: async () => {
                const resp = await Company.all();
                return resp.data;
            },
            validators: [
                DynamicFormValidators.required()
            ],
            associationText: 'name',
            associationValue: '_id'
        }
    },
    {
        name: 'Application',
        key: 'application',
        component: FormFieldTypes.asyncAutocomplete,
        mainGroup: 'App info',
        options: {
            row: 2,
            flex: 50,
            placeholder: 'Select a application',
            selectOptions: async (arg) => {
                if (ObjectID.isValid(arg)) {
                    const resp = await Application.find(arg);
                    return [resp];
                } else {
                    const resp = await Application.option('search', arg).all();
                    return resp.data;
                }
            },
            associationText: 'name',
            associationValue: '_id'
        }
    },
    {
        name: 'Application role',
        key: 'applicationRole',
        component: FormFieldTypes.enum,
        mainGroup: 'App info',
        options: {
            row: 2,
            flex: 50,
            placeholder: 'Select a language',
            enumSelectOptions: [
                { text: 'Admin', value: 'ADMIN' },
                { text: 'User', value: 'USER' }
            ]
        }
    },
    {
        name: 'Active user',
        key: 'isActive',
        component: FormFieldTypes.switch,
        mainGroup: 'App info',
        options: {
            row: 3,
            flex: 100,
            validators: [
                DynamicFormValidators.requiredTrue({ message: 'The field active user is required'})
            ]
        }
    },
    {
        name: 'First name',
        key: 'firstName',
        component: FormFieldTypes.textField,
        mainGroup: 'Basic info',
        options: {
            placeholder: 'Write your fisrt name',
            validators: [
                DynamicFormValidators.required({ message: 'The field first name is required' })
            ],
            row: 2,
            flex: 50
        }
    },
    {
        name: 'Last name',
        key: 'lastName',
        component: FormFieldTypes.textField,
        mainGroup: 'Basic info',
        options: {
            placeholder: 'Write your last name',
            validators: [
                DynamicFormValidators.required()
            ],
            row: 2,
            flex: 50
        }
    },
    {
        name: 'User name',
        key: 'userName',
        component: FormFieldTypes.textField,
        mainGroup: 'Basic info',
        options: {
            placeholder: 'Write your user name',
            row: 1,
            flex: 100
        }
    },
    {
        name: 'Document type',
        key: 'userInformation.documentType',
        component: FormFieldTypes.enum,
        mainGroup: 'Basic info',
        options: {
            placeholder: 'Select a type of document',
            row: 3,
            flex: 15,
            validators: [
                DynamicFormValidators.required({ message: 'The field document type is required' })
            ],
            enumSelectOptions: [
                { value: 'dni', text: 'DNI' },
                { value: 'passport', text: 'Passport' }
            ]
        }
    },
    {
        name: 'Document number',
        key: 'userInformation.documentNumber',
        component: FormFieldTypes.textField,
        mainGroup: 'Basic info',
        options: {
            placeholder: 'Write your document number',
            row: 3,
            flex: 35
        }
    },
    {
        name: 'Birthdate',
        key: 'userInformation.birthdate',
        component: FormFieldTypes.datepicker,
        mainGroup: 'Basic info',
        options: {
            placeholder: 'White your birthdate',
            validators: [
                DynamicFormValidators.required({message: 'The field birthdate is required'})
            ],
            row: 3,
            flex: 25
        }
    },
    {
        name: 'Age',
        key: 'userInformation.age',
        component: FormFieldTypes.numericField,
        mainGroup: 'Basic info',
        options: {
            placeholder: 'White your age',
            validators: [
                DynamicFormValidators.required({ message: 'The field age is required' }),
                DynamicFormValidators.min(2),
                DynamicFormValidators.max(5)
            ],
            row: 3,
            flex: 25
        }
    },
    {
        name: 'Gender',
        key: 'userInformation.gender',
        component: FormFieldTypes.radioGroup,
        mainGroup: 'Basic info',
        options: {
            row: 4,
            flex: 100,
            radioGroupOptions: [
                { text: 'Male', value: 'male' },
                { text: 'Female', value: 'female' }
            ],
            validators: [
                DynamicFormValidators.required({message: 'The field gender is required'})
            ]
        }
    },
    {
        name: 'Email',
        key: 'email',
        component: FormFieldTypes.textField,
        mainGroup: 'Basic info',
        options: {
            placeholder: 'Write your email',
            validators: [
                DynamicFormValidators.required({message: 'The email is required'}),
                DynamicFormValidators.email()
            ]
        }
    },
    {
        name: 'Password',
        key: 'password',
        component: FormFieldTypes.passwordField,
        mainGroup: 'Basic info',
        options: {
            placeholder: 'Write your password',
            validators: [
                DynamicFormValidators.required({message: 'The field password is required'}),
                DynamicFormValidators.minLength(10),
                DynamicFormValidators.hasNumber(),
                DynamicFormValidators.hasCapitalCase(),
                DynamicFormValidators.hasSpecialCharacters(),
                DynamicFormValidators.hasSmallCase()
            ]
        }
    },
    {
        name: 'Confirm password',
        key: 'confirm_password',
        component: FormFieldTypes.passwordField,
        mainGroup: 'Basic info',
        options: {
            placeholder: 'Confirm your password',
            validators: [
                DynamicFormValidators.required({message: 'The confirm is required'}),
                DynamicFormValidators.confirm('password')
            ]
        }
    },
    {
        name: 'Phone',
        key: 'userInformation.phone',
        component: FormFieldTypes.textField,
        mainGroup: 'More info',
        options: {
            validators: [
                DynamicFormValidators.required(),
                DynamicFormValidators.digits(10),
            ],
            placeholder: 'Write your phone',
            row: 2,
            flex: 50
        }
    },
    {
        name: 'Cell Phone',
        key: 'userInformation.cellPhone',
        component: FormFieldTypes.textField,
        mainGroup: 'More info',
        options: {
            placeholder: 'Write your phone',
            row: 2,
            flex: 50
        }
    },
    {
        name: 'Note',
        key: 'userInformation.note',
        component: FormFieldTypes.textarea,
        mainGroup: 'More info',
        options: {
            placeholder: 'Additional Information',
            validators: [
                DynamicFormValidators.required({message: 'The field note is required'})
            ],
            row: 3,
            flex: 100
        }
    },
    {
        name: 'Role',
        key: 'role',
        component: FormFieldTypes.select,
        mainGroup: 'Basic info',
        options: {
            placeholder: 'Select a role',
            selectOptions: async (arg) => {
                const resp = arg ? await Role.where('company', arg).all() : await Role.all();
                return resp.data;
            },
            validators: [
                DynamicFormValidators.required({message: 'The field role is required'})
            ],
            associationText: 'name',
            associationValue: '_id',
            depend: 'company'
        }
    },
    {
        name: 'Current store',
        key: 'userConfigurations.currentStore',
        component: FormFieldTypes.autocomplete,
        mainGroup: 'Configurations',
        options: {
            placeholder: 'Select a store',
            selectOptions: async (arg) => {
                const resp = arg ? await Store.where('company', arg).all() : await Store.all();
                return resp.data;
            },
            validators: [
                DynamicFormValidators.required({message: 'The field current store is required'})
            ],
            associationText: 'name',
            associationValue: '_id',
            depend: 'company'
        }
    },
    {
        name: 'Language',
        key: 'userConfigurations.language',
        component: FormFieldTypes.enum,
        mainGroup: 'Configurations',
        options: {
            placeholder: 'Select a language',
            enumSelectOptions: [
                { text: 'Spanish', value: 'es' },
                { text: 'English', value: 'en' }
            ]
        }
    }
];

export default userFields;
