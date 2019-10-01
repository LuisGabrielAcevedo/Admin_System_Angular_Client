import { DynamicTableHeader, DynamicTableComponentType } from 'src/app/modules/shared-modules/table/table.interfaces';

export const applicationHeaders: DynamicTableHeader[] = [
    {
        label: 'Code',
        key: 'code',
        component: DynamicTableComponentType.text
    },
    {
        label: 'Name',
        key: 'name',
        component: DynamicTableComponentType.text
    },
    {
        label: 'Descripcion',
        key: 'description',
        component: DynamicTableComponentType.text
    }
];

export default applicationHeaders;