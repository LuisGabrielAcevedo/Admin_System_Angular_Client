import { TableHeader, TableButtonAction } from '../components/sharedComponents/table/table.interfaces';
export const CustomersTableHeader: TableHeader[] = [

    {
        label: 'Nombre',
        value: 'firstName',
        type: 'TableTextComponent',
        class: 'table_long'
    },
    {
        label: 'Apellido',
        value: 'lastName',
        type: 'TableTextComponent',
        class: 'table_long'
    },
    {
        label: 'Telefono',
        value: 'phone',
        type: 'TableTextComponent',
        class: 'table_long'
    }
];

export const CustomersRowActions: TableButtonAction[] = [
    {
        icon: 'edit',
        label: 'Editar',
        type: 'TableButtonComponent',
        redirectTo: '/administration/customers/form'
    },
    {
        icon: 'delete',
        label: 'Borrar',
        type: 'TableButtonComponent',
        modal: {
            number: 1,
            row: 0,
            question: 'Esta seguro que desea borrar el consumidor?',
            successButtonText: 'Si',
            successButtonEvent: 'delete',
            cancelButtonText: 'No'
        }
    }
];
