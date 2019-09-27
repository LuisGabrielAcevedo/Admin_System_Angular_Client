import { DynamicTableHeader, DynamicTableComponentType } from 'src/app/modules/shared-modules/table/table.interfaces';

export const vendorHeaders: DynamicTableHeader[] = [
    {
        label: 'Empresa',
        key: 'company.name',
        component: DynamicTableComponentType.text
    },
    {
        label: 'Nombre',
        key: 'name',
        component: DynamicTableComponentType.text
    },
    {
        label: 'Email',
        key: 'email',
        component: DynamicTableComponentType.text
    },
    {
        label: 'Phone',
        key: 'phone',
        component: DynamicTableComponentType.text
    }
];

export default vendorHeaders;