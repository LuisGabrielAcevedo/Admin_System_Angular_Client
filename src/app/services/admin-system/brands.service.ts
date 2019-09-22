import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TableButtonAction } from 'src/app/components/sharedComponents/table/table.interfaces';
import Brand from 'src/app/models/admin-system/brands';

@Injectable({
    providedIn: 'root',
})
export default class BrandService {
    constructor(
        private router: Router
    ) {}

    getRowActions(): TableButtonAction[] {
        return [
            {
                icon: 'edit',
                label: 'Editar',
                type: 'TableButtonComponent',
                event: (arg) => {
                    this.router.navigate(['/admin-system/brands/edit', arg._id]);
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
                    successButtonEvent: (arg) => Brand.destroyRx(arg._id).pipe(),
                    cancelButtonText: 'No'
                }
            }
        ];
    }
}
