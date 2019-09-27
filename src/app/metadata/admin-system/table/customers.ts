import { DynamicTableHeader, DynamicTableComponentType } from 'src/app/modules/shared-modules/table/table.interfaces';

const customerHeaders: DynamicTableHeader[] = [
    {
        label: 'Nombre completo',
        key: 'firstName,lastName',
        component: DynamicTableComponentType.text
    },
    {
        label: 'Email',
        key: 'email',
        component: DynamicTableComponentType.text
    }
];

export default customerHeaders;