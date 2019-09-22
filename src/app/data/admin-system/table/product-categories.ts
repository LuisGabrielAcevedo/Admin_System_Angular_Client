import { TableHeader } from 'src/app/components/sharedComponents/table/table.interfaces';

export const productTypeHeaders: TableHeader[] = [
    {
        label: 'Empresa',
        value: 'company.name',
        type: 'TableTextComponent'
    },
    {
        label: 'Nombre',
        value: 'name',
        type: 'TableTextComponent'
    }
];

export default productTypeHeaders;