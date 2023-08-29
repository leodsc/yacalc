import {Postfix} from '../postfix';

describe('infix to postfix notation', () => {
  it('given a+b*c+d should return abc*+d+', () => {
    const postfix = new Postfix('a+ b*c+d');
    expect(postfix.convert().join('')).toBe('abc*+d+');
  });

  it('given (A+B)*C-D should return AB+C*D-', () => {
    const postfix = new Postfix('(A+B)*C-D');
    expect(postfix.convert().join('')).toBe('AB+C*D-');
  });

  it('given A+B-C should return AB+C-', () => {
    const postfix = new Postfix('A+B-C');
    expect(postfix.convert().join('')).toBe('AB+C-');
  });

  it('given A+B should return AB+', () => {
    const postfix = new Postfix('A+B');
    expect(postfix.convert().join('')).toBe('AB+');
  });

  it('given A*B+C*D should return AB*CD*+', () => {
    const postfix = new Postfix('A*B+C*D');
    expect(postfix.convert().join('')).toBe('AB*CD*+');
  });

  it('given (A+B)*(C+D) should return AB+CD+*', () => {
    const postfix = new Postfix('(A+B)*(C+D)');
    expect(postfix.convert().join('')).toBe('AB+CD+*');
  });

  it('given K+L-M*N+(O^P)*W/U/V*T+Q should return KL+MN*-OP^W*U/V/T*+Q+', () => {
    const postfix = new Postfix('K+L-M*N+(O^P)*W/U/V*T+Q');
    expect(postfix.convert().join('')).toBe('KL+MN*-OP^W*U/V/T*+Q+');
  });
});
