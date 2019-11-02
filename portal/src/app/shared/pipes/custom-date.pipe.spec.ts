import { CustomDatePipe } from './custom-date.pipe';

describe('CustomDatePipe', () => {
  it('create an instance', () => {
    const pipe = new CustomDatePipe();
    expect(pipe).toBeTruthy();
  });

  it('Should be separated by slashes when length is 8', () => {
    const pipe = new CustomDatePipe();
    const result = pipe.transform('01011990');
    expect(result).toEqual('01/01/1990');
    const wrongResult = pipe.transform('0101199');
    expect(wrongResult.includes('/')).toBeFalsy();
  });
});
