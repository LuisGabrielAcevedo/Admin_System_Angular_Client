import { FormField, FormFieldTypes } from 'src/app/components/sharedComponents/dynamic-form/dynamic-form.interfaces';
import Application from '../../models/adminSystem/applications';
import Role from '../../models/adminSystem/roles';
import Company from '../../models/adminSystem/companies';
import Store from '../../models/adminSystem/stores';
import ObjectID from 'bson-objectid';

const userFields: FormField[] = [
    {
        name: 'Company',
        key: 'company',
        component: FormFieldTypes.autocomplete,
        tab: 'App info',
        options: {
            row: 1,
            flex: 100,
            placeholder: 'Select a company',
            selectOptions: async () => {
                const resp = await Company.all();
                return resp.data;
            },
            associationText: 'name',
            associationValue: '_id'
        }
    },
    {
        name: 'Application',
        key: 'application',
        component: FormFieldTypes.asyncAutocomplete,
        tab: 'App info',
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
        tab: 'App info',
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
        tab: 'App info',
        options: {
            row: 3,
            flex: 100,
            validationRules: [
                {
                    rule: 'requiredTrue',
                    message: 'The field active user is required'
                }
            ]
        }
    },
    {
        name: 'First name',
        key: 'firstName',
        component: FormFieldTypes.textField,
        tab: 'Basic info',
        options: {
            placeholder: 'Write your fisrt name',
            validationRules: [
                {
                    rule: 'required',
                    message: 'The field first name is required'
                }
            ],
            row: 2,
            flex: 50
        }
    },
    {
        name: 'Last name',
        key: 'lastName',
        component: FormFieldTypes.textField,
        tab: 'Basic info',
        options: {
            placeholder: 'Write your last name',
            row: 2,
            flex: 50
        }
    },
    {
        name: 'User name',
        key: 'userName',
        component: FormFieldTypes.textField,
        tab: 'Basic info',
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
        tab: 'Basic info',
        options: {
            placeholder: 'Select a type of document',
            row: 3,
            flex: 15,
            validationRules: [
                {
                    rule: 'required',
                    message: 'The field document type is required'
                }
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
        tab: 'Basic info',
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
        tab: 'Basic info',
        options: {
            placeholder: 'White your birthdate',
            validationRules: [
                {
                    rule: 'required',
                    message: 'The field birthdate is required'
                }
            ],
            row: 3,
            flex: 25
        }
    },
    {
        name: 'Age',
        key: 'userInformation.age',
        component: FormFieldTypes.numericField,
        tab: 'Basic info',
        options: {
            placeholder: 'White your age',
            validationRules: [
                {
                    rule: 'required',
                    message: 'The field age is required'
                },
                {
                    rule: 'min:2',
                    message: 'The number must be greater than 2'
                },
                {
                    rule: 'max:5',
                    message: 'The number must be less than 5'
                }
            ],
            row: 3,
            flex: 25
        }
    },
    {
        name: 'Gender',
        key: 'userInformation.gender',
        component: FormFieldTypes.radioGroup,
        tab: 'Basic info',
        options: {
            row: 4,
            flex: 100,
            radioGroupOptions: [
                { text: 'Male', value: 'male' },
                { text: 'Female', value: 'female' }
            ],
            validationRules: [
                {
                    rule: 'required',
                    message: 'The field gender is required'
                }
            ]
        }
    },
    {
        name: 'Email',
        key: 'email',
        component: FormFieldTypes.textField,
        tab: 'Basic info',
        options: {
            placeholder: 'Write your email',
            validationRules: [
                {
                    rule: 'required',
                    message: 'The email is required'
                },
                {
                    rule: 'email',
                    message: 'Please enter a valid email address'
                }
            ]
        }
    },
    {
        name: 'Password',
        key: 'password',
        component: FormFieldTypes.passwordField,
        tab: 'Basic info',
        options: {
            placeholder: 'Write your password',
            validationRules: [
                {
                    rule: 'required',
                    message: 'The field password is required'
                },
                {
                    rule: 'minLength:8',
                    message: 'Must be at least 8 characters'
                },
                {
                    rule: 'hasNumber',
                    message: 'Must contain at least 1 number'
                },
                {
                    rule: 'hasCapitalCase',
                    message: 'Must contain at least 1 in Capital Case'
                },
                {
                    rule: 'hasSpecialCharacters',
                    message: 'Must contain at least 1 Special Character'
                },
                {
                    rule: 'hasSmallCase',
                    message: 'Must contain at least 1 Letter in Small Case'
                }
            ]
        }
    },
    {
        name: 'Confirm password',
        key: 'confirm_password',
        component: FormFieldTypes.passwordField,
        tab: 'Basic info',
        options: {
            placeholder: 'Confirm your password',
            validationRules: [
                {
                    rule: 'required',
                    message: 'The confirm is required'
                },
                {
                    rule: 'confirm:password',
                    message: 'Password do not match'
                }
            ]
        }
    },
    {
        name: 'Phone',
        key: 'userInformation.phone',
        component: FormFieldTypes.textField,
        tab: 'More info',
        options: {
            placeholder: 'Write your phone',
            row: 2,
            flex: 50
        }
    },
    {
        name: 'Cell Phone',
        key: 'userInformation.cellPhone',
        component: FormFieldTypes.textField,
        tab: 'More info',
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
        tab: 'More info',
        options: {
            placeholder: 'Additional Information',
            validationRules: [
                {
                    rule: 'required',
                    message: 'The field note is required'
                }
            ],
            row: 3,
            flex: 100
        }
    },
    {
        name: 'Role',
        key: 'role',
        component: FormFieldTypes.select,
        tab: 'Basic info',
        options: {
            placeholder: 'Select a role',
            selectOptions: async (arg) => {
                const resp = arg ? await Role.where('company', arg).all() : await Role.all();
                return resp.data;
            },
            validationRules: [
                {
                    rule: 'required',
                    message: 'The field role is required'
                }
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
        tab: 'Configurations',
        options: {
            placeholder: 'Select a store',
            selectOptions: async (arg) => {
                const resp = arg ? await Store.where('company', arg).all() : await Store.all();
                return resp.data;
            },
            validationRules: [
                {
                    rule: 'required',
                    message: 'The field current store is required'
                }
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
        tab: 'Configurations',
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
