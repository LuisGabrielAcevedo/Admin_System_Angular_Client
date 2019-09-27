import { DynamicTableHeader, DynamicTableComponentType } from 'src/app/modules/shared-modules/table/table.interfaces';

const productHeaders: DynamicTableHeader[] = [
    {
        label: 'Nombre',
        key: 'name',
        component: DynamicTableComponentType.text,
        sortable: 'name'
    },
    {
        label: 'Empresa',
        key: 'company.name',
        component: DynamicTableComponentType.text,
        sortable: 'company'
    },
    {
        label: 'Price',
        key: 'basePrice/a/$',
        component: DynamicTableComponentType.text,
        sortable: 'basePrice'
    },
];

export default productHeaders;