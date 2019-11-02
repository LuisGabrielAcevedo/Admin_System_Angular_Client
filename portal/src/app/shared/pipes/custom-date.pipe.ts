import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {
  transform(value: string): string {
    return value.replace(/([0-9]{2}).*([0-9]{2}).*([0-9]{4})/, '$1/$2/$3');
  }
}
