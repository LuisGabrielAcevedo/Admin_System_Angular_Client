import { DniPipe } from './dni.pipe';

describe('DniPipe', () => {
  it('create an instance', () => {
    const pipe = new DniPipe();
    expect(pipe).toBeTruthy();
  });

  it('Should be separated by thousands', () => {
    const pipe = new DniPipe();
    const resultWhenLengthIsSeven = pipe.transform('1234567');
    expect(resultWhenLengthIsSeven).toEqual('1.234.567');
    const resultWhenLengthIsEight = pipe.transform('12345678');
    expect(resultWhenLengthIsEight).toEqual('12.345.678');
    const wrongResult = pipe.transform('123456');
    expect(wrongResult.includes('.')).toBeFalsy();
  });
});
