import { TableHeader, TableButtonAction } from '../components/sharedComponents/table/table.interfaces';
export const PermissionsTableHeader: TableHeader[] = [
    {
        label: 'Id',
        value: '_id',
        type: 'TableTextComponent',
        class: 'table_long'
    },
    {
        label: 'Nombre',
        value: 'name',
        type: 'TableTextComponent',
        class: 'table_long'
    },
    {
        label: 'Modulo',
        value: 'module',
        type: 'TableTextComponent',
        class: 'table_long'
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
