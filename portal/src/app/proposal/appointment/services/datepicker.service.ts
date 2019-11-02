import { Injectable } from '@angular/core';
import { DATEPICKER_I18 } from '@app/constants/date.constants';
import { NgbDatepickerI18n, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Injectable({ providedIn: 'root' })
export class DatePickerService extends NgbDatepickerI18n {
  constructor() {
    super();
  }

  getWeekdayShortName(weekday: number): string {
    return DATEPICKER_I18['es'].weekdays[weekday - 1];
  }
  getMonthShortName(month: number): string {
    return DATEPICKER_I18['es'].months[month - 1];
  }
  getMonthFullName(month: number): string {
    return this.getMonthShortName(month);
  }

  getDayAriaLabel(date: NgbDateStruct): string {
    return `${date.day}-${date.month}-${date.year}`;
  }
}
