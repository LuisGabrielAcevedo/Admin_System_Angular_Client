import { TableHeader, TableButtonAction } from '../components/sharedComponents/table/table.interfaces';
export const PermissionsTableHeader: TableHeader[] = [
    {
        label: 'Id',
        value: '_id',
        type: 'TableTextComponent'
    },
    {
        label: 'Nombre',
        value: 'name',
        type: 'TableTextComponent'
    },
    {
        label: 'Modulo',
        value: 'module',
        type: 'TableTextComponent'
    }

];

export const PermissionRowActions: TableButtonAction[] = [
    {
        icon: 'edit',
        label: 'Editar',
        type: 'TableButtonComponent',
        redirectTo: '/administration/permissions/form'
    },
    {
        icon: 'delete',
        label: 'Borrar',
        type: 'TableButtonComponent',
        outputItemAction: 'delete'
    }
];
