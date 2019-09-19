import { TableHeader } from 'src/app/components/sharedComponents/table/table.interfaces';

export const applicationsHeaders: TableHeader[] = [
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

export default applicationsHeaders;