import { TableHeader, TableButtonAction } from '../components/sharedComponents/table/table.interfaces';
export const LocalsTableHeader: TableHeader[] = [

    {
        label: 'Nombre',
        value: 'name',
        type: 'TableTextComponent'
    },
    {
        label: 'Empresa',
        value: 'company.name',
        type: 'TableTextComponent'
    },
    {
        label: 'Aplicacion',
        value: 'application.name',
        type: 'TableApplicationTypeComponent'
    }
];

export const LocalsRowActions: TableButtonAction[] = [
    {
        icon: 'edit',
        label: 'Editar',
        type: 'TableButtonComponent',
        redirectTo: '/administration/locals/form'
    },
    {
        icon: 'delete',
        label: 'Borrar',
        type: 'TableButtonComponent',
        modal: {
            number: 1,
            row: 0,
            question: 'Esta seguro que desea borrar el Local?',
            successButtonText: 'Si',
            successButtonEvent: 'delete',
            cancelButtonText: 'No'
        }
    }
];
