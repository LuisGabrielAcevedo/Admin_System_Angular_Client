import { DomainPipe } from './domain.pipe';

describe('DomainPipe', () => {
  it('create an instance', () => {
    const pipe = new DomainPipe();
    expect(pipe).toBeTruthy();
  });

  it('Should put one minus sign if length is 6', () => {
    const pipe = new DomainPipe();
    const result = pipe.transform('AAA111');
    expect(result.charAt(3)).toEqual('-');
    const wrongResult = pipe.transform('AAA21');
    expect(wrongResult.includes('-')).toBeFalsy();
  });

  it('Should put two minus sign if length is 7', () => {
    const pipe = new DomainPipe();
    const result = pipe.transform('AA111AA');
    expect(result).toEqual('AA-111-AA');
  });
});
