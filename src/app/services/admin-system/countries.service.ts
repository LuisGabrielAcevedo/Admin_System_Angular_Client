import { DynamicTableButtonAction } from 'src/app/modules/shared-modules/table/table.interfaces';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import Country from '../../models/admin-system/countries';

@Injectable({
    providedIn: 'root',
})
export default class CountryService {
    constructor(
        private router: Router
    ) {}

    getRowActions(): DynamicTableButtonAction[] {
        return [
            {
                icon: 'edit',
                label: 'Editar',
                type: 'TableButtonComponent',
                event: (arg) => {
                    this.router.navigate(['/admin-system/countries/edit', arg._id]);
                }
            },
            {
                icon: 'delete',
                label: 'Eliminar',
                type: 'TableButtonComponent',
                modal: {
                    number: 1,
                    row: 0,
                    question: 'Esta seguro que desea borrar el pais?',
                    successButtonText: 'Si',
                    successButtonEvent: (arg) => Country.destroyRx(arg._id).pipe(),
                    cancelButtonText: 'No'
                }
            }
        ];
    }
}
