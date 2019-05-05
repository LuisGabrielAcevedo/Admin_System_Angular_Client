import { TableHeader, TableButtonAction } from '../components/sharedComponents/table/table.interfaces';
export const LicensesTableHeader: TableHeader[] = [
    {
        label: 'Codigo',
        value: 'code',
        type: 'TableTextComponent',
        class: 'table_long'
    },
    {
        label: 'Empresa',
        value: 'company.name',
        type: 'TableTextComponent',
        class: 'table_long'
    },
    {
        label: 'Fecha de Vencimiento',
        value: 'expirateAt',
        type: 'TableTextComponent',
        class: 'table_long'
    }
];

export const LicensesRowActions: TableButtonAction[] = [
    {
        icon: 'edit',
        label: 'Editar',
        type: 'TableButtonComponent',
        redirectTo: '/administration/licenses/form'
    },
    {
        icon: 'delete',
        label: 'Borrar',
        type: 'TableButtonComponent',
        modal: {
            number: 1,
            row: 0,
            question: 'Esta seguro que desea borrar la licencia?',
            successButtonText: 'Si',
            successButtonEvent: 'delete',
            cancelButtonText: 'No'
        }
    }
];
