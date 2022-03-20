import * as cpu from '../../src/use-spyOn/cpu';
import { sum } from '../../src/use-spyOn/modules-self';

describe('modules-self', () => {
    const a_70 = 190392490709135;
    jest.spyOn(cpu, 'fib').mockReturnValue(a_70);

    test('test sum func', () => {
        expect(sum(70)).toStrictEqual(a_70 * 2)
    })
})