import { TableHeader } from 'src/app/components/sharedComponents/table/table.interfaces';

export const applicationsHeaders: TableHeader[] = [
    {
        label: 'Id',
        value: '_id',
        type: 'TableApplicationTypeComponent'
    },
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
        label: 'descripcion',
        value: 'description',
        type: 'TableTextComponent'
    }
];

export default applicationsHeaders;