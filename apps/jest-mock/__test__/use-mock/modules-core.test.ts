import { readFileFromDisk } from '../../src/use-mock/modules-core';

jest.mock('path');
jest.mock('fs');

describe('modules-core', () => {
    test('test readFileFromDisk func', () => {
        expect(readFileFromDisk()).toStrictEqual({
            path: '__mocks__/a/b/c/file.txt',
            value: '__mocks__://github.com/skychx',
        })
    })
})
