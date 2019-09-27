import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DynamicTableButtonAction } from 'src/app/modules/shared-modules/table/table.interfaces';
import ProductCategory from 'src/app/models/admin-system/product-categories';

@Injectable({
    providedIn: 'root',
})
export default class ProductCategoryService {
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
                    this.router.navigate(['/admin-system/product-categories/edit', arg._id]);
                }
            },
            {
                icon: 'delete',
                label: 'Eliminar',
                type: 'TableButtonComponent',
                modal: {
                    number: 1,
                    row: 0,
                    question: 'Esta seguro que desea borrar la categoria?',
                    successButtonText: 'Si',
                    successButtonEvent: (arg) => ProductCategory.destroyRx(arg._id).pipe(),
                    cancelButtonText: 'No'
                }
            }
        ];
    }
}
