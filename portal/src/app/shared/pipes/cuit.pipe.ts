import { Pipe, PipeTransform } from '@angular/core';
import { Person } from '@app/pre-proposal/api/person';

@Pipe({
  name: 'cuit'
})
export class CuitPipe implements PipeTransform {
  transform(value: Person[], args?: any): PersonWithLabel[] {
    return value.map(obj => {
      const stringCuitl = '' + obj.number;
      if (stringCuitl.length < 10 || stringCuitl.length > 11) {
        return { ...obj, label: stringCuitl };
      }
      const formatedCuitl = `${stringCuitl.slice(0, 2)}-${stringCuitl.slice(
        2,
        -1
      )}-${stringCuitl.slice(-1)}`;
      return { ...obj, label: formatedCuitl };
    });
  }
}

interface PersonWithLabel extends Person {
  label: string;
}
