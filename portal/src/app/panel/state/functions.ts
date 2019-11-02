import { Moment } from 'moment';
import { DateApp } from './proposal-filter/proposal.filter.model';

export function momentToOurDate(moment: Moment): DateApp {
  return {
    year: moment.year(),
    month: moment.month() + 1,
    day: moment.date()
  };
}
