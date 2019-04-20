import { TableHeader, TableButtonAction } from '../components/sharedComponents/table/table.interfaces';
export const CountriesTableHeader: TableHeader[] = [


    {
        label: 'Pais',
        value: 'name',
        type: 'TableTextComponent',
        class: 'table_long'
    },
    {
        label: 'Lenguaje',
        value: 'language',
        type: 'TableTextComponent',
        class: 'table_long'
    },
    {
        label: 'Moneda',
        value: 'currency',
        type: 'TableTextComponent',
        class: 'table_long'
    }
];

export const CountriesRowActions: TableButtonAction[] = [
    {
        icon: 'edit',
        label: 'Editar',
        type: 'TableButtonComponent',
        redirectTo: '/administration/countries/form'
    },
    {
        icon: 'delete',
        label: 'Borrar',
        type: 'TableButtonComponent',
        modal: {
            number: 1,
            row: 0,
            question: 'Esta seguro que desea borrar el Pais?',
            successButtonText: 'Si',
            successButtonEvent: 'delete',
            cancelButtonText: 'No'
        }
    }
];

