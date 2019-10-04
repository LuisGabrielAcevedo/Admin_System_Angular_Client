import { IDynamicTableButton } from 'src/app/modules/shared-modules/table/table.interfaces';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import Product from 'src/app/models/admin-system/products';

@Injectable({
    providedIn: 'root',
})
export default class ProductService {
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
                    this.router.navigate(['/admin-system/products/edit', arg._id]);
                }
            },
            {
                icon: 'delete',
                label: 'Eliminar',
                type: 'TableButtonComponent',
                modal: {
                    number: 1,
                    row: 0,
                    question: 'Esta seguro que desea borrar el producto?',
                    successButtonText: 'Si',
                    successButtonEvent: (arg) => Product.destroyRx(arg._id).pipe(),
                    cancelButtonText: 'No'
                }
            }
        ];
    }
}
