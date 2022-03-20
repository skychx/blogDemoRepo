const axios = jest.createMockFromModule('axios');

// @ts-ignore
axios.get =async (url: string) => {
    return {
        data: {
            login: '__mocks__ name',
            blog: '__mocks__ blog',
        }
    }
};

export default axios;