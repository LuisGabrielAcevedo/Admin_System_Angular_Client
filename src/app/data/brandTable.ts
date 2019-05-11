import { TableHeader, TableButtonAction } from '../components/sharedComponents/table/table.interfaces';
export const BrandsTableHeader: TableHeader[] = [
    {
        label: 'Nombre',
        value: 'name',
        type: 'TableTextComponent'
    },
    {
        label: 'Empresa',
        value: 'company.name',
        type: 'TableTextComponent'
    }
];

export const BrandsRowActions: TableButtonAction[] = [
    {
        icon: 'edit',
        label: 'Editar',
        type: 'TableButtonComponent',
        redirectTo: '/administration/brands/form'
    },
    {
        icon: 'delete',
        label: 'Borrar',
        type: 'TableButtonComponent',
        outputItemAction: 'delete'
    }
];
