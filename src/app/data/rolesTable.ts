import { TableHeader, TableButtonAction } from '../components/sharedComponents/table/table.interfaces';
export const RolesTableHeader: TableHeader[] = [
    {
        label: 'Aplicacion',
        value: 'application.name',
        type: 'TableApplicationTypeComponent'
    },
    {
        label: 'Empresa',
        value: 'company.name',
        type: 'TableTextComponent'
    },
    {
        label: 'Nombre',
        value: 'name',
        type: 'TableTextComponent'
    },
    {
        label: 'Descripcion',
        value: 'description',
        type: 'TableTextComponent'
    }
];

export const RolesRowActions: TableButtonAction[] = [
    {
        icon: 'edit',
        label: 'Editar',
        type: 'TableButtonComponent',
        redirectTo: '/administration/roles/form'
    },
    {
        icon: 'delete',
        label: 'Borrar',
        type: 'TableButtonComponent',
        modal: {
            number: 1,
            row: 0,
            question: 'Esta seguro que desea borrar la Rol?',
            successButtonText: 'Si',
            successButtonEvent: 'delete',
            cancelButtonText: 'No'
        }
    }
];
