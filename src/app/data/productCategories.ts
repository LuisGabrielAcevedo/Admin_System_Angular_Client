import { TableHeader, TableButtonAction } from '../components/sharedComponents/table/table.interfaces';
export const ProductCategoriesTableHeader: TableHeader[] = [

    {
        label: 'Nombre',
        value: 'name',
        type: 'TableTextComponent',
        class: 'table_long'
    },
    {
        label: 'Comapañia',
        value: 'company.name',
        type: 'TableTextComponent',
        class: 'table_long'
    },

];

export const ProductCategoriesRowActions: TableButtonAction[] = [
    {
        icon: 'edit',
        label: 'Editar',
        type: 'TableButtonComponent',
        redirectTo: '/administration/product-categories/form'
    },
    {
        icon: 'delete',
        label: 'Borrar',
        type: 'TableButtonComponent',
        modal: {
            number: 1,
            row: 0,
            question: 'Esta seguro que desea borrar la Categoria producto?',
            successButtonText: 'Si',
            successButtonEvent: 'delete',
            cancelButtonText: 'No'
        }
    }
];
