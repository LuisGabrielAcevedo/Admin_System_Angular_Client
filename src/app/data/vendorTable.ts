import { TableHeader, TableButtonAction } from '../components/sharedComponents/table/table.interfaces';
export const VendorsTableHeader: TableHeader[] = [
    {
        label: 'Nombre',
        value: 'vendorName',
        type: 'TableTextComponent'
    },
    {
        label: 'Empresa',
        value: 'companyName',
        type: 'TableTextComponent'
    },
    {
        label: 'Creado por',
        value: 'createdBy.name',
        type: 'TableTextComponent'
    }
];

export const VendorsRowActions: TableButtonAction[] = [
    {
        icon: 'edit',
        label: 'Editar',
        type: 'TableButtonComponent',
        redirectTo: '/administration/vendors/form'
    },
    {
        icon: 'delete',
        label: 'Borrar',
        type: 'TableButtonComponent',
        modal: {
            number: 1,
            row: 0,
            question: 'Esta seguro que desea borrar el Vendedor?',
            successButtonText: 'Si',
            successButtonEvent: 'delete',
            cancelButtonText: 'No'
        }
    }
];



