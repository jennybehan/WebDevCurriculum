const mocks = {
    String: () => 'It works!',
    Query: () => ({
        user: (root, args) => {
            return {
                name: args.name
            }
        },
    }),
    User: () => ({
        name: () => users.name
    })
};

const users = [{
        id: '01',
        name: 'user01'
    },
    {
        id: '02',
        name: 'user02'
    },
    {
        id: '03',
        name: 'user03'
    }
];

export default mocks;