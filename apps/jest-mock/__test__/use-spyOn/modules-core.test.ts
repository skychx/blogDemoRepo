import fs from 'fs';
import path from 'path';

import { readFileFromDisk } from '../../src/use-spyOn/modules-core';

describe('modules-core', () => {
    const mockPath = 'a/b/c/file.txt';
    const mockTxt = 'https://github.com/skychx';
    jest.spyOn(path, 'join').mockReturnValue(mockPath);
    jest.spyOn(fs, 'readFileSync').mockReturnValue(mockTxt);

    test('test readFileFromDisk func', () => {
        expect(readFileFromDisk()).toStrictEqual({
            path: mockPath,
            value: mockTxt,
        })
    })
})
