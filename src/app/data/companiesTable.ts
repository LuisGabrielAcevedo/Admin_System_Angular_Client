import { TableHeader, TableButtonAction } from '../components/sharedComponents/table/table.interfaces';
export const CompaniesTableHeader: TableHeader[] = [
    {
        label: '',
        value: 'profileImage.url',
        type: 'TableImageComponent',
        class: 'table_long'
    },
    {
        label: 'Nombre',
        value: 'name',
        type: 'TableTextComponent',
        class: 'table_long'
    },
    {
        label: 'Moneda',
        value: 'currency',
        type: 'TableTextComponent',
        class: 'table_long'
    }
];

export const CompaniesRowActions: TableButtonAction[] = [
    {
        icon: 'edit',
        label: 'Editar',
        type: 'TableButtonComponent',
        redirectTo: '/administration/companies/form'
    },
    {
        icon: 'delete',
        label: 'Borrar',
        type: 'TableButtonComponent',
        modal: {
            number: 1,
            row: 0,
            question: 'Esta seguro que desea borrar la empresa?',
            successButtonText: 'Si',
            successButtonEvent: 'delete',
            cancelButtonText: 'No'
        }
    }
];
