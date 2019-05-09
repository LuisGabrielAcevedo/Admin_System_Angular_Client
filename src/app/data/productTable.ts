import { TableHeader, TableButtonAction } from '../components/sharedComponents/table/table.interfaces';
export const ProductsTableHeader: TableHeader[] = [
    {
        label: '',
        value: 'profileImage.url',
        type: 'TableImageComponent',
        class: 'table_long'
    },
    {
        label: 'Empresa',
        value: 'company.name',
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
        label: 'Precio',
        value: 'price/b/$ AR',
        type: 'TableTextComponent',
        class: 'table_long'
    },
    {
        label: 'Cantidad',
        value: 'totalAvailable',
        type: 'TableTextComponent',
        class: 'table_long'
    }
    // {
    //     label: 'Marca',
    //     value: 'brand.name',
    //     type: 'TableTextComponent',
    //     class: 'table_long'
    // },
    // {
    //     label: 'Tipo',
    //     value: 'type.name',
    //     type: 'TableTextComponent',
    //     class: 'table_long'
    // },
    // {
    //     label: 'Categoria',
    //     value: 'category.name',
    //     type: 'TableTextComponent',
    //     class: 'table_long'
    // }
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
