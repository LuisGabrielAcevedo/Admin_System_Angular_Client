import { TableHeader } from 'src/app/components/sharedComponents/table/table.interfaces';

const userHeaders: TableHeader[] = [
    {
        label: '',
        value: 'profileImage.url',
        type: 'TableImageComponent'
    },
    {
        label: 'Empresa',
        value: 'company.name',
        type: 'TableTextComponent'
    },
    {
        label: 'Nombre',
        value: 'firstName,lastName',
        type: 'TableTextComponent'
    }
];

export default userHeaders;