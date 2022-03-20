const path = jest.createMockFromModule('fs');

// @ts-ignore
path.join = (...args) => {
    return '__mocks__/a/b/c/file.txt'
};

export default path;