import { TableHeader, TableButtonAction } from '../components/sharedComponents/table/table.interfaces';
export const CountriesTableHeader: TableHeader[] = [
    {
        label: 'Pais',
        value: 'name',
        type: 'TableTextComponent'
    },
    {
        label: 'Lenguaje',
        value: 'language',
        type: 'TableTextComponent'
    },
    {
        label: 'Moneda',
        value: 'currency',
        type: 'TableTextComponent'
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

