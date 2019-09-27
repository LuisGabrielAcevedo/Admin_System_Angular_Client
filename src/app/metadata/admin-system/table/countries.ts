import { DynamicTableHeader, DynamicTableComponentType } from 'src/app/modules/shared-modules/table/table.interfaces';

const countryHeaders: DynamicTableHeader[] = [
    {
        label: 'Pais',
        key: 'name',
        component: DynamicTableComponentType.text
    },
    {
        label: 'Lenguaje',
        key: 'language',
        component: DynamicTableComponentType.text
    },
    {
        label: 'Moneda',
        key: 'currency',
        component: DynamicTableComponentType.text
    }
];

export default countryHeaders;