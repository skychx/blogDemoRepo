import { fib } from '../../src/use-mock/cpu'

describe('cpu', () => {
    test('test fib func', () => {
        expect(fib(1)).toStrictEqual(1)
        expect(fib(2)).toStrictEqual(1)
        expect(fib(10)).toStrictEqual(55)
    })
})