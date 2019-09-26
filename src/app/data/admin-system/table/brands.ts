import { DynamicTableHeader, DynamicTableComponentType } from 'src/app/components/sharedComponents/table/table.interfaces';

export const brandHeaders: DynamicTableHeader[] = [
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

export default brandHeaders;