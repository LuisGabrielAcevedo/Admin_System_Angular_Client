import { TableHeader } from 'src/app/components/sharedComponents/table/table.interfaces';

const countryHeaders: TableHeader[] = [
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

export default countryHeaders;