import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dni'
})
export class DniPipe implements PipeTransform {
  transform(value: string): string {
    if (value) {
      return value.replace(
        /([0-9]{1,2})\.?([0-9]{3})\.?([0-9]{3})/,
        '$1.$2.$3'
      );
    } else {
      return value;
    }
  }
}
