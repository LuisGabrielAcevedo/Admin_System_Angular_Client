import { TableHeader } from 'src/app/components/sharedComponents/table/table.interfaces';

const stateHeaders: TableHeader[] = [
    {
        label: 'Name',
        value: 'name',
        type: 'TableTextComponent'
    },
    {
        label: 'Country',
        value: 'country.name',
        type: 'TableTextComponent'
    }
];

export default stateHeaders;