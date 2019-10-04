import { IDynamicTableButton } from 'src/app/modules/shared-modules/table/table.interfaces';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import State from 'src/app/models/admin-system/states';

@Injectable({
    providedIn: 'root',
})
export default class StateService {
    constructor(
        private router: Router
    ) {}

    getRowActions(): IDynamicTableButton[] {
        return [
            {
                icon: 'edit',
                label: 'Editar',
                type: 'TableButtonComponent',
                event: (arg) => {
                    this.router.navigate(['/admin-system/states/edit', arg._id]);
                }
            },
            {
                icon: 'delete',
                label: 'Eliminar',
                type: 'TableButtonComponent',
                modal: {
                    number: 1,
                    row: 0,
                    question: 'Esta seguro que desea borrar el estado?',
                    successButtonText: 'Si',
                    successButtonEvent: (arg) => State.destroyRx(arg._id).pipe(),
                    cancelButtonText: 'No'
                }
            }
        ];
    }
}
