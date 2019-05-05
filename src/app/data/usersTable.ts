import { TableHeader, TableButtonAction } from '../components/sharedComponents/table/table.interfaces';
export const UsersTableHeader: TableHeader[] = [
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
        value: 'firstName,lastName',
        type: 'TableTextComponent',
        class: 'table_long'
    },
    {
        label: 'Empresa',
        value: 'company.name',
        type: 'TableTextComponent',
        class: 'table_long'
    },
    {
        label: 'Api rol',
        value: 'applicationRole',
        type: 'TableApplicationTypeComponent',
        class: 'table_long'
    }
];