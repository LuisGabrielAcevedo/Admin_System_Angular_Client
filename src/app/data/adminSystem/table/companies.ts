import { TableHeader } from 'src/app/components/sharedComponents/table/table.interfaces';
export const companiesHeaders: TableHeader[] = [
    {
        label: 'Aplicacion',
        value: 'application.name',
        type: 'TableApplicationTypeComponent'
    },
    {
        label: '',
        value: 'profileImage.url',
        type: 'TableImageComponent'
    },
    {
        label: 'Nombre',
        value: 'name',
        type: 'TableTextComponent'
    },
    {
        label: 'Pais',
        value: 'country.name',
        type: 'TableTextComponent'
    }
];

export default companiesHeaders;