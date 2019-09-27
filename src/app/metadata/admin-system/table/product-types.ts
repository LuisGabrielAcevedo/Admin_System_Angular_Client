import { DynamicTableHeader, DynamicTableComponentType } from 'src/app/modules/shared-modules/table/table.interfaces';

export const productCategoryHeaders: DynamicTableHeader[] = [
    {
        label: 'Empresa',
        key: 'company.name',
        component: DynamicTableComponentType.text
    },
    {
        label: 'Nombre',
        key: 'name',
        component: DynamicTableComponentType.text
    }
];

export default productCategoryHeaders;