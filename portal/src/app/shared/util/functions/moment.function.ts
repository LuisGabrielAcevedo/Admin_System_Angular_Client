import * as moment from 'moment';

/**
 * Function to generate a moment object from a date string with formats
 * 'DDMMYYYY' or 'DD-MM-YYYY'.
 * @param date The date as a string type with aforementioned formats.
 */
export const genMoment = (date: string): moment.Moment => {
  return moment(date, ['DDMMYYYY', 'DD-MM-YYYY']);
};
