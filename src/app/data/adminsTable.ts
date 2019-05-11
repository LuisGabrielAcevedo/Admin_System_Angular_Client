import { TableHeader, TableButtonAction } from '../components/sharedComponents/table/table.interfaces';
export const AdminsTableHeader: TableHeader[] = [
    {
        label: '',
        value: 'profileImage.url',
        type: 'TableImageComponent'
    },
    {
        label: 'Nombre',
        value: 'firstName',
        type: 'TableTextComponent'
    },
    {
        label: 'Apellido',
        value: 'lastName',
        type: 'TableTextComponent'
    },
    {
        label: 'Correo',
        value: 'email',
        type: 'TableTextComponent'
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

