import { TableHeader } from '../components/sharedComponents/table/table.interfaces';
export const UsersTableHeader: TableHeader[] = [
    {
        label: 'Aplicacion',
        value: 'application.name',
        type: 'TableApplicationTypeComponent'
    },
    {
        label: 'Empresa',
        value: 'company.name',
        type: 'TableTextComponent'
    },
    {
        label: '',
        value: 'profileImage.url',
        type: 'TableImageComponent'
    },
    {
        label: 'Nombre',
        value: 'firstName,lastName',
        type: 'TableTextComponent'
    },
    {
        label: 'Api rol',
        value: 'applicationRole',
        type: 'TableApplicationTypeComponent'
    }
];
