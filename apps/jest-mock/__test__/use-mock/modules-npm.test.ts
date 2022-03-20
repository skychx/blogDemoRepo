import { fetchData } from '../../src/use-mock/modules-npm';

jest.mock('axios');

describe('modules-npm', () => {
    test('test fetchData func', async () => {
        expect(await fetchData()).toStrictEqual({
            name: '__mocks__ name',
            blog: '__mocks__ blog',
        })
    })
})