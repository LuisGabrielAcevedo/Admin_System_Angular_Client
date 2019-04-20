import { TableHeader, TableButtonAction } from '../components/sharedComponents/table/table.interfaces';
export const ProductTypesTableHeader: TableHeader[] = [
    {
        label: 'Nombre',
        value: 'name',
        type: 'TableTextComponent',
        class: 'table_long'
    },
    {
        label: 'Empresa',
        value: 'company.name',
        type: 'TableTextComponent',
        class: 'table_long'
    }
];

export const ProductTypesRowActions: TableButtonAction[] = [
    {
        icon: 'edit',
        label: 'Editar',
        type: 'TableButtonComponent',
        redirectTo: '/administration/product-types/form'
    },
    {
        icon: 'delete',
        label: 'Borrar',
        type: 'TableButtonComponent',
        modal: {
            number: 1,
            row: 0,
            question: 'Esta seguro que desea borrar el Tipo de Producto?',
            successButtonText: 'Si',
            successButtonEvent: 'delete',
            cancelButtonText: 'No'
        }
    }
];



