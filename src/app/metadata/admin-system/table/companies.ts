import { DynamicTableHeader, DynamicTableComponentType } from 'src/app/modules/shared-modules/table/table.interfaces';
export const companyHeaders: DynamicTableHeader[] = [
    {
        label: '',
        key: 'profileImage.url',
        component: DynamicTableComponentType.image
    },
    {
        label: 'Nombre',
        key: 'name',
        component: DynamicTableComponentType.text
    },
    {
        label: 'Pais',
        key: 'country.name',
        component: DynamicTableComponentType.text
    }
];

export default companyHeaders;