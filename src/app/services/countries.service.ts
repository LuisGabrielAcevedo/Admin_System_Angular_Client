import { TableButtonAction } from '../components/sharedComponents/table/table.interfaces';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export default class CountryService {
    constructor(
        private router: Router
    ) {}

    getRowActions(): TableButtonAction[] {
        return [];
    }
}
