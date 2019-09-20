import { TableHeader } from 'src/app/components/sharedComponents/table/table.interfaces';

const productHeaders: TableHeader[] = [
    {
        label: 'Nombre',
        value: 'name',
        type: 'TableTextComponent'
    },
    {
        label: 'Empresa',
        value: 'company.name',
        type: 'TableTextComponent'
    },
];

export default productHeaders;