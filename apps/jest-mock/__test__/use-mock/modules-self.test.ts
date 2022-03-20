import { sum } from '../../src/use-mock/modules-self';

jest.mock('../../src/use-mock/cpu.ts');

describe('modules-self', () => {
    const a_70 = 190392490709135;
    test('test sum func', () => {
        expect(sum(70)).toStrictEqual(a_70 * 2)
    })
})