// example data
const users = [{
        id: "user01",
        name: "jennybe",
        pw: 1111
    },
    {
        id: "user02",
        name: "yijo",
        pw: 2222
    },
    {
        id: "user03",
        name: "skshim",
        pw: 3333
    }
];

const memos = [{
        _id: "01",
        title: 'Introduction to GraphQL',
        content: "2"
    },
    {
        _id: "02",
        title: 'Welcome to Meteor',
        content: "3"
    },
    {
        _id: "03",
        title: 'Advanced GraphQL',
        content: "1"
    },
    {
        _id: "04",
        title: 'Launchpad is Cool',
        content: "7"
    },
];

const resolvers = {
    Query: {
        getUsers: () => users,
        getUser: (getUsers, {
            id
        }) => {
            return users.find(user => user.id === id);
        },
        getMemoList: () => memos,
        getMemo: (getMemoList, {
            _id
        }) => {
            return memos.find(memo => memo._id === _id);
        },
    }
}

module.exports = resolvers;