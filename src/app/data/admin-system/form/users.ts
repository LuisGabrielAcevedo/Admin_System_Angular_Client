import { FormField, FormFieldTypes } from 'src/app/components/sharedComponents/dynamic-form/dynamic-form.interfaces';
import { DynamicFormValidators } from 'src/app/components/sharedComponents/dynamic-form/validate/dynamic-form-validators';
import Company from 'src/app/models/admin-system/companies';
import Application from 'src/app/models/admin-system/applications';
import Role from 'src/app/models/admin-system/roles';
import Store from 'src/app/models/admin-system/stores';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

const userFields: FormField[] = [
    {
        name: 'Company',
        key: 'company',
        component: FormFieldTypes.asyncAutocomplete,
        mainGroup: 'App info',
        flexConfig: {
            row: 1,
            flex: 100
        },
        options: {
            placeholder: 'Select a company',
            fieldOptions: (arg) => Company.option('search', arg).findRx().pipe(map(resp => resp.data)),
            associationText: 'name',
            associationValue: '_id'
        }
    },
    {
        name: 'Application',
        key: 'application',
        component: FormFieldTypes.asyncAutocomplete,
        mainGroup: 'App info',
        flexConfig: {
            row: 2,
            flex: 50
        },
        options: {
            fieldOptions: (arg) => Application.option('search', arg).findRx().pipe(map(resp => resp.data)),
            placeholder: 'Select a application',
            associationText: 'name',
            associationValue: '_id'
        }
    },
    {
        name: 'Application role',
        key: 'applicationRole',
        component: FormFieldTypes.enum,
        mainGroup: 'App info',
        flexConfig: {
            row: 2,
            flex: 50
        },
        options: {
            placeholder: 'Select a language',
            fieldOptions: () => of([
                { text: 'Admin', value: 'ADMIN' },
                { text: 'User', value: 'USER' }
            ])
        }
    },
    {
        name: 'Active user',
        key: 'isActive',
        component: FormFieldTypes.switch,
        mainGroup: 'App info',
        flexConfig: {
            row: 3,
            flex: 100
        }
    },
    {
        name: 'First name',
        key: 'firstName',
        component: FormFieldTypes.textField,
        mainGroup: 'Basic info',
        flexConfig: {
            row: 2,
            flex: 50
        },
        validators: [
            DynamicFormValidators.required({ message: 'The field first name is required' })
        ],
        options: {
            placeholder: 'Write your fisrt name',
        }
    },
    {
        name: 'Last name',
        key: 'lastName',
        component: FormFieldTypes.textField,
        mainGroup: 'Basic info',
        flexConfig: {
            row: 2,
            flex: 50
        },
        validators: [
            DynamicFormValidators.required()
        ],
        options: {
            placeholder: 'Write your last name'
        }
    },
    {
        name: 'User name',
        key: 'userName',
        component: FormFieldTypes.textField,
        mainGroup: 'Basic info',
        flexConfig: {
            row: 1,
            flex: 100
        },
        options: {
            placeholder: 'Write your user name'
        }
    },
    {
        name: 'Document type',
        key: 'userInformation.documentType',
        component: FormFieldTypes.enum,
        mainGroup: 'Basic info',
        flexConfig: {
            row: 3,
            flex: 15
        },
        options: {
            placeholder: 'Select a type of document',
            fieldOptions: () => of([
                { value: 'dni', text: 'DNI' },
                { value: 'passport', text: 'Passport' }
            ])
        }
    },
    {
        name: 'Document number',
        key: 'userInformation.documentNumber',
        component: FormFieldTypes.textField,
        mainGroup: 'Basic info',
        flexConfig: {
            row: 3,
            flex: 35
        },
        options: {
            placeholder: 'Write your document number'
        }
    },
    {
        name: 'Birthdate',
        key: 'userInformation.birthdate',
        component: FormFieldTypes.datepicker,
        mainGroup: 'Basic info',
        flexConfig: {
            row: 3,
            flex: 50
        },
        options: {
            placeholder: 'White your birthdate'
        }
    },
    {
        name: 'Gender',
        key: 'userInformation.gender',
        component: FormFieldTypes.radioGroup,
        mainGroup: 'Basic info',
        flexConfig: {
            row: 4,
            flex: 100
        },
        options: {
            fieldOptions: () => of([
                { text: 'Male', value: 'male' },
                { text: 'Female', value: 'female' }
            ])
        }
    },
    {
        name: 'Email',
        key: 'email',
        component: FormFieldTypes.textField,
        mainGroup: 'Basic info',
        validators: [
            DynamicFormValidators.required({message: 'The email is required'}),
            DynamicFormValidators.email()
        ],
        options: {
            placeholder: 'Write your email'
        }
    },
    {
        name: 'Password',
        key: 'password',
        component: FormFieldTypes.passwordField,
        mainGroup: 'Basic info',
        // validators: [
        //     DynamicFormValidators.required({message: 'The field password is required'}),
        //     DynamicFormValidators.minLength(10),
        //     DynamicFormValidators.hasNumber(),
        //     DynamicFormValidators.hasCapitalCase(),
        //     DynamicFormValidators.hasSpecialCharacters(),
        //     DynamicFormValidators.hasSmallCase()
        // ],
        options: {
            placeholder: 'Write your password'
        }
    },
    {
        name: 'Confirm password',
        key: 'confirm_password',
        component: FormFieldTypes.passwordField,
        mainGroup: 'Basic info',
        // validators: [
        //     DynamicFormValidators.required({message: 'The confirm is required'}),
        //     DynamicFormValidators.confirm('password')
        // ],
        options: {
            placeholder: 'Confirm your password'
        }
    },
    {
        name: 'Phone',
        key: 'userInformation.phone',
        component: FormFieldTypes.textField,
        mainGroup: 'More info',
        flexConfig: {
            row: 2,
            flex: 50
        },
        options: {
            placeholder: 'Write your phone'
        }
    },
    // {
    //     name: 'Note',
    //     key: 'userInformation.note',
    //     component: FormFieldTypes.textarea,
    //     mainGroup: 'More info',
    //     flexConfig: {
    //         row: 3,
    //         flex: 100
    //     },
    //     validators: [
    //         DynamicFormValidators.required({message: 'The field note is required'})
    //     ],
    //     options: {
    //         placeholder: 'Additional Information'
    //     }
    // },
    {
        name: 'Role',
        key: 'role',
        component: FormFieldTypes.autocomplete,
        mainGroup: 'Basic info',
        options: {
            placeholder: 'Select a role',
            fieldOptions: (arg) => {
                return arg 
                ? Role.where('company', arg).findRx().pipe(map(resp => resp.data))
                : Role.findRx().pipe(map(resp => resp.data))
            },
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
            fieldOptions: (arg) => {
                return arg 
                ? Store.where('company', arg).findRx().pipe(map(resp => resp.data))
                : Store.findRx().pipe(map(resp => resp.data))
            },
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
            fieldOptions: () => of([
                { text: 'Spanish', value: 'es' },
                { text: 'English', value: 'en' }
            ])
        }
    }
];

export default userFields;
