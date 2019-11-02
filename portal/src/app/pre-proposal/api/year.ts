export interface Year {
  id: number;
  description: string;
  year: number;
  price: number;
  isUsed: boolean;
  zeroKm?: boolean;
  fullDescription: string;
  valid: boolean;
  disabled: boolean;
}

export const YearFactory = (param: any = {}): Year => {
  const newYear = {
    id: null,
    description: '',
    year: 0,
    price: 0,
    isUsed: true,
    zeroKm: false,
    fullDescription: '',
    valid: false,
    disabled: false
  };

  const result = { ...newYear, ...param } as Year;
  result.isUsed = !result.zeroKm;
  result.fullDescription = result.year + ' ' + (result.isUsed ? '' : '0Km');
  result.disabled = !result.valid;

  return result;
};
