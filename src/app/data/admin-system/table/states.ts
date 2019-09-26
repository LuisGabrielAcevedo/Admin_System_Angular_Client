import { DynamicTableHeader, DynamicTableComponentType } from 'src/app/components/sharedComponents/table/table.interfaces';

const stateHeaders: DynamicTableHeader[] = [
    {
        label: 'Name',
        key: 'name',
        component: DynamicTableComponentType.text
    },
    {
        label: 'Country',
        key: 'country.name',
        component: DynamicTableComponentType.text
    }
];

export default stateHeaders;