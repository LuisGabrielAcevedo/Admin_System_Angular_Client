import * as moment from 'moment';

export const MOMENT_1950 = moment('1950-01-01');

export const MONTHS = [
  { id: '1', description: 'ENERO' },
  { id: '2', description: 'FEBRERO' },
  { id: '3', description: 'MARZO' },
  { id: '4', description: 'ABRIL' },
  { id: '5', description: 'MAYO' },
  { id: '6', description: 'JUNIO' },
  { id: '7', description: 'JULIO' },
  { id: '8', description: 'AGOSTO' },
  { id: '9', description: 'SEPTIEMBRE' },
  { id: '10', description: 'OCTUBRE' },
  { id: '11', description: 'NOVIEMBRE' },
  { id: '12', description: 'DICIEMBRE' }
];

export const DATEPICKER_I18 = {
  es: {
    weekdays: ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'],
    months: [
      'Ene',
      'Feb',
      'Mar',
      'Abr',
      'May',
      'Jun',
      'Jul',
      'Ago',
      'Sep',
      'Oct',
      'Nov',
      'Dic'
    ]
  }
  // other languages you would support
};
