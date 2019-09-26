import { DynamicTableButtonAction } from 'src/app/components/sharedComponents/table/table.interfaces';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export default class StoreService {
    constructor(
        private router: Router
    ) {}

    getRowActions(): DynamicTableButtonAction[] {
        return [];
    }
}
