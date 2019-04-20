import { TableHeader, TableButtonAction } from '../components/sharedComponents/table/table.interfaces';
export const AdminsTableHeader: TableHeader[] = [
    {
        label: '',
        value: 'profileImage.url',
        type: 'TableImageComponent',
        class: 'table_long'
    },
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
        label: 'Correo',
        value: 'email',
        type: 'TableTextComponent',
        class: 'table_long'
    }
];

export const AdminsRowActions: TableButtonAction[] = [
    {
        icon: 'edit',
        label: 'Editar',
        type: 'TableButtonComponent',
        redirectTo: '/administration/admins/form'
    },
    {
        icon: 'delete',
        label: 'Borrar',
        type: 'TableButtonComponent',
        outputItemAction: 'delete'
    }
];

