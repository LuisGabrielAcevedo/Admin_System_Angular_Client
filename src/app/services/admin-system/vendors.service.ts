import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IDynamicTableButton } from 'src/app/modules/shared-modules/table/table.interfaces';

@Injectable({
    providedIn: 'root',
})
export default class VendorService {
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
                    this.router.navigate(['/admin-system/vendors/edit', arg._id]);
                }
            }
        ];
    }
}
