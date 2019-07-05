import { Injectable } from '@angular/core';
declare const require: any;
const pluralize = require('pluralize');

@Injectable({
  providedIn: 'root'
})
export class PluralizeService {
  constructor() { }

  singular(value: string): string {
    return pluralize.singular(value);
  }
}
