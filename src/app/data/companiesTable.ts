import { TableHeader, TableButtonAction } from '../components/sharedComponents/table/table.interfaces';
export const CompaniesTableHeader: TableHeader[] = [
    {
        label: 'Aplicacion',
        value: 'application.name',
        type: 'TableApplicationTypeComponent'
    },
    {
        label: '',
        value: 'profileImage.url',
        type: 'TableImageComponent'
    },
    {
        label: 'Nombre',
        value: 'name',
        type: 'TableTextComponent'
    },
    {
        label: 'Pais',
        value: 'country.name',
        type: 'TableTextComponent'
    }
];
