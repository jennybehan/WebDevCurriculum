const {
    makeExecutableSchema
} = require('graphql-tools');
const resolvers = require('./resolvers');

const typeDefs = `
    type User {
        id: String
        pw: Int
        name: String
        memos: [Memo]
    }

    type Users {
        users: [User]
    }

    type Memo {
        _id: String
        title: String
        content: String
        user: String!
    }

    type Query {
        getUsers: [User]
        getUser(id: String, pw: Int): User
        login(id: String, pw: Int): User
        getMemoList: [Memo]
        getMemo(_id: String): Memo
    }

    type Mutation {
        login(id: ID!, pw: String!): String
        createMemo(userId: ID!, title: String, content: String): Memo
        motifyMemo(_id: ID!, title: String, content: String): Memo
        deleteMemo(_id: ID!, title: String, content: String): Memo
    }
`;

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});

module.exports = schema;