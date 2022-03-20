import axios from 'axios';

import { fetchData } from '../../src/use-spyOn/modules-npm';

describe('modules-npm', () => {
    const mockName = 'mock name';
    const mockBlog = 'mock blog';
    jest.spyOn(axios, 'get').mockResolvedValue({
        data: {
            login: mockName,
            blog: mockBlog,
        }
    });

    test('test fetchData func', async () => {
        expect(await fetchData()).toStrictEqual({
            name: mockName,
            blog: mockBlog,
        })
    })
})