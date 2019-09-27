import { DynamicTableHeader, DynamicTableComponentType } from 'src/app/modules/shared-modules/table/table.interfaces';

const userHeaders: DynamicTableHeader[] = [
    {
        label: '',
        key: 'profileImage.url',
        component: DynamicTableComponentType.image,
    },
    {
        label: 'Empresa',
        key: 'company.name',
        component: DynamicTableComponentType.text,
        sortable: 'company'
    },
    {
        label: 'Nombre',
        key: 'firstName,lastName',
        component: DynamicTableComponentType.text,
        sortable: 'firstName'
    }
];

export default userHeaders;