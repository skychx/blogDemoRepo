const fs = jest.createMockFromModule('fs');

// @ts-ignore
fs.readFileSync = (...args) => {
    return '__mocks__://github.com/skychx'
};

export default fs;