import { TableHeader, TableButtonAction } from '../components/sharedComponents/table/table.interfaces';
export const CustomersTableHeader: TableHeader[] = [
    {
        label: 'Aplicacion',
        value: 'application.name',
        type: 'TableApplicationTypeComponent'
    },
    {
        label: 'Nombre completo',
        value: 'firstName,lastName',
        type: 'TableTextComponent'
    },
    {
        label: 'Email',
        value: 'email',
        type: 'TableTextComponent'
    }
];