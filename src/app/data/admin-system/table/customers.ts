import { TableHeader } from 'src/app/components/sharedComponents/table/table.interfaces';

const customerHeaders: TableHeader[] = [
    {
        label: 'Nombre completo',
        value: 'firstName,lastName',
        type: 'TableTextComponent'
    },
    {
        label: 'Email',
        value: 'email',
        type: 'TableTextComponent'
    }
];

export default customerHeaders;