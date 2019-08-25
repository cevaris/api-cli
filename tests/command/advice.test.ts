import { _validateIds } from '../../src/command/advice';

it('test _validateIds with valid numbers', () => {
    expect(_validateIds(['1', '33', '444'])).toEqual([1, 33, 444]);
});

it('test _validateIds with valid negative numbers', () => {
    expect(_validateIds(['-10', '0', '10'])).toEqual([-10, 0, 10]);
});

it('test _validateIds with invalid numbers', () => {
    const err = Error('a is not a number');
    expect(() => _validateIds(['1', 'a', 'b'])).toThrowError(err);
});