import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DynamicTableButtonAction } from 'src/app/components/sharedComponents/table/table.interfaces';
import ProductType from 'src/app/models/admin-system/product-types';

@Injectable({
    providedIn: 'root',
})
export default class ProductTypeService {
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
                    this.router.navigate(['/admin-system/product-types/edit', arg._id]);
                }
            },
            {
                icon: 'delete',
                label: 'Eliminar',
                type: 'TableButtonComponent',
                modal: {
                    number: 1,
                    row: 0,
                    question: 'Esta seguro que desea borrar el tipo?',
                    successButtonText: 'Si',
                    successButtonEvent: (arg) => ProductType.destroyRx(arg._id).pipe(),
                    cancelButtonText: 'No'
                }
            }
        ];
    }
}
