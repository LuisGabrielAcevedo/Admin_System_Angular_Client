import { TableHeader } from 'src/app/components/sharedComponents/table/table.interfaces';

export const applicationHeaders: TableHeader[] = [
    {
        label: 'Code',
        value: 'code',
        type: 'TableTextComponent'
    },
    {
        label: 'Name',
        value: 'name',
        type: 'TableTextComponent'
    },
    {
        label: 'Descripcion',
        value: 'description',
        type: 'TableTextComponent'
    }
];

export default applicationHeaders;