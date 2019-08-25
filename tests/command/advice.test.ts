import { validateIds } from '../../src/command/advice';

it('test validateIds with valid numbers', () => {
    expect(validateIds(['1', '33', '444'])).toEqual([1, 33, 444]);
});

it('test validateIds with valid negative numbers', () => {
    expect(validateIds(['-10', '0', '10'])).toEqual([-10, 0, 10]);
});

it('test validateIds with invalid numbers', () => {
    const err = Error('a is not a number');
    expect(() => validateIds(['1', 'a', 'b'])).toThrowError(err);
});