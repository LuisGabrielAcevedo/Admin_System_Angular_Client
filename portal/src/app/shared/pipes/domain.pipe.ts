import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'domain'
})
export class DomainPipe implements PipeTransform {
  transform(value: string): any {
    value = value ? value.toUpperCase() : '';
    if (value.length === 6) {
      return value.slice(0, 3) + '-' + value.slice(3);
    } else if (value.length === 7) {
      return value.slice(0, 2) + '-' + value.slice(2, 5) + '-' + value.slice(5);
    }
    return value;
  }
}
