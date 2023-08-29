import {calculate} from '../calculate';

describe('calculate', () => {
  it('given 2+2 should return 4', () => {
    expect(calculate('2+2')).toBe(4);
  });

  it('given 2-2 should return 0', () => {
    expect(calculate('2-2')).toBe(0);
  });

  it('given (2+2)*4 should return 16', () => {
    expect(calculate('(2+2)*4')).toBe(16);
  });

  it('given (2+2/2)*4 should return 12', () => {
    expect(calculate('(2+2/2)*4')).toBe(12);
  });

  it('given (2+2/2)*4+10-33(4-2) should return 44', () => {
    expect(calculate('(2+2/2)*4+10-33*(4-2)')).toBe(-44);
  });

  it('given (2.0+2/2)*4.2*3(4-2)/5.3 with default precision should return 14.264150943', () => {
    expect(calculate('(2.0+2/2)*4.2*3*(4-2)/5.3')).toBe(14.264150943);
  });

  it('given (2.0+2/2)*4.2*3(4-2)/5.3 with 12 precision should return 14.264150943', () => {
    expect(calculate('(2.0+2/2)*4.2*3*(4-2)/5.3', 12)).toBe(14.264150943396);
  });

  it('given (2.0+2/2)*4.2*3(4-2)/5.3 with 5 precision should return 14.264150943', () => {
    expect(calculate('(2.0+2/2)*4.2*3*(4-2)/5.3', 5)).toBe(14.26415);
  });

  it('given 2.0+2.7 should return 4.7', () => {
    expect(calculate('2.0+2.7')).toBe(4.7);
  });

  it('given 2.5+2.3845938 should return 4.8845938', () => {
    expect(calculate('2.5+2.3845938')).toBe(4.8845938);
  });
});
