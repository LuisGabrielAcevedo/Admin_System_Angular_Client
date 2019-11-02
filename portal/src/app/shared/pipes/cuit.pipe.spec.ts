import { CuitPipe } from './cuit.pipe';

describe('CuitPipe', () => {
  it('create an instance', () => {
    const pipe = new CuitPipe();
    expect(pipe).toBeTruthy();
  });

  it('Should map array to return new property label on each object', () => {
    const pipe = new CuitPipe();
    const result = pipe.transform([
      { number: 20959256706, description: 'TEST1' },
      { number: 11111111111, description: 'TEST2' },
      { number: 123, description: 'WRONGTEST' }
    ]);
    expect(result[0].label).toEqual('20-95925670-6');
    expect(result[1].label).toEqual('11-11111111-1');
    expect(result[2].label.includes('-')).toBeFalsy();
  });
});
