import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DynamicTableButtonAction } from 'src/app/modules/shared-modules/table/table.interfaces';

@Injectable({
    providedIn: 'root',
})
export default class ApplicationService {
    constructor(
        private router: Router
    ) {}

    getRowActions(): DynamicTableButtonAction[] {
        return [];
    }
}
