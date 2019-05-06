import { TableHeader, TableButtonAction } from '../components/sharedComponents/table/table.interfaces';
export const CompaniesTableHeader: TableHeader[] = [
    {
        label: 'Aplicacion',
        value: 'application.name',
        type: 'TableApplicationTypeComponent',
        class: 'table_long'
    },
    {
        label: '',
        value: 'profileImage.url',
        type: 'TableImageComponent',
        class: 'table_long'
    },
    {
        label: 'Nombre',
        value: 'name',
        type: 'TableTextComponent',
        class: 'table_long'
    },
    {
        label: 'Pais',
        value: 'country.name',
        type: 'TableTextComponent',
        class: 'table_long'
    }
];
