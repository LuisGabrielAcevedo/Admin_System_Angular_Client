import { DynamicTableHeader, DynamicTableComponentType } from 'src/app/modules/shared-modules/table/table.interfaces';

const storeHeaders: DynamicTableHeader[] = [
    {
        label: 'Nombre',
        key: 'name',
        component: DynamicTableComponentType.text
    },
    {
        label: 'Empresa',
        key: 'company.name',
        component: DynamicTableComponentType.text
    }
];

export default storeHeaders;