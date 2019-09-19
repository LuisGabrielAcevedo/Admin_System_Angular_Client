import { TableHeader, TableButtonAction } from '../components/sharedComponents/table/table.interfaces';
export const ProductsTableHeader: TableHeader[] = [
    {
        label: '',
        value: 'profileImage.url',
        type: 'TableImageComponent'
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
        label: 'Precio',
        value: 'price/b/$ AR',
        type: 'TableTextComponent'
    },
    {
        label: 'Cantidad',
        value: 'totalAvailable',
        type: 'TableTextComponent'
    }
];

export const ProductsRowActions: TableButtonAction[] = [
    {
        icon: 'edit',
        label: 'Editar',
        type: 'TableButtonComponent',
        redirectTo: '/administration/products/form'
    },
    {
        icon: 'delete',
        label: 'Borrar',
        type: 'TableButtonComponent',
        modal: {
            number: 1,
            row: 0,
            question: 'Esta seguro que desea borrar el producto?',
            successButtonText: 'Si',
            successButtonEvent: 'delete',
            cancelButtonText: 'No'
        }
    }
];
