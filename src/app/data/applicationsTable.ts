import { TableHeader, TableButtonAction } from '../components/sharedComponents/table/table.interfaces';
export const ApplicationsTableHeader: TableHeader[] = [
    {
        label: 'Id',
        value: '_id',
        type: 'TableApplicationTypeComponent'
    },
    {
        label: 'Code',
        value: 'code',
        type: 'TableTextComponent'
    },
    {
        label: 'Name',
        value: 'name',
        type: 'TableTextComponent'
    },
    {
        label: 'descripcion',
        value: 'description',
        type: 'TableTextComponent'
    }
];

export const ApplicationsRowActions: TableButtonAction[] = [
    {
        icon: 'edit',
        label: 'Editar',
        type: 'TableButtonComponent',
        redirectTo: '/administration/applications/form'
    },
    {
        icon: 'delete',
        label: 'Borrar',
        type: 'TableButtonComponent',
        modal: {
            number: 1,
            row: 0,
            question: 'Esta seguro que desea borrar la aplicacion?',
            successButtonText: 'Si',
            successButtonEvent: 'delete',
            cancelButtonText: 'No'
        }
    }
];
