import { TableHeader } from 'src/app/components/sharedComponents/table/table.interfaces';

export const vendorHeaders: TableHeader[] = [
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
        label: 'Email',
        value: 'email',
        type: 'TableTextComponent'
    },
    {
        label: 'Phone',
        value: 'phone',
        type: 'TableTextComponent'
    }
];

export default vendorHeaders;