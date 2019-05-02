import { TableHeader, TableButtonAction } from '../components/sharedComponents/table/table.interfaces';
export const UsersTableHeader: TableHeader[] = [
    {
        label: '',
        value: 'profileImage.url',
        type: 'TableImageComponent',
        class: 'table_long'
    },
    {
        label: 'Nombre',
        value: 'firstName',
        type: 'TableTextComponent',
        class: 'table_long'
    },
    {
        label: 'Empresa',
        value: 'company.name',
        type: 'TableTextComponent',
        class: 'table_long'
    },
    {
        label: 'Rol',
        value: 'role.name',
        type: 'TableTextComponent',
        class: 'table_long'
    }
];

export const UsersRowActions: TableButtonAction[] = [
    {
        icon: 'close',
        label: 'Eliminar',
        type: 'TableButtonComponent',
        modal: {
            number: 1,
            row: 0,
            question: 'Esta seguro que desea borrar el Usuario?',
            successButtonText: 'Si',
            successButtonEvent: 'delete',
            cancelButtonText: 'No'
        }
    },
    {
        icon: 'chevron_left',
        type: 'TableButtonComponent',
        modal: {
            number: 2,
            row: 0,
            buttons: [
                {
                    icon: 'info',
                    label: 'Informacion',
                    type: 'TableButtonComponent',
                    activeComponet: {
                        type: 'TableItemInformationComponent',
                        value: [
                            'Id:/b/_id',
                            'Email:/b/email',
                            'Nombre:/b/firstName',
                            'Apellido:/b/lastName',
                            'Empresa:/b/company.name',
                            'Rol:/b/role.name',
                            'Fecha de registro:/b/createAt',
                            'Fecha de Actualizacion:/b/updateAt'
                        ]
                    }
                },
                {
                    icon: 'edit',
                    label: 'Editar',
                    type: 'TableButtonComponent',
                    redirectTo: '/administration/users/form'
                }
            ]
        }
    }
];
