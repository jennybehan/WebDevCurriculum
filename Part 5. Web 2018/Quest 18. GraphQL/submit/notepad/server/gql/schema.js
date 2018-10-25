const {
    makeExecutableSchema,
    addMockFunctionsToSchema
} = require('graphql-tools');
const resolvers = require('./resolvers');
const mocks = require('./mock');

const typeDefs = `
    type User {
        id: String!
        name: String!
        memos: [Memo]
    }

    type Users {
        users: [User]
    }

    type Memo {
        _id: String!
        title: String
        content: String
        user: String!
    }

    type Query {
        User(id: ID!): User
        Users: [User]
        MemoList: [Memo]
        Memo(id: ID!): Memo
    }

    type Mutation {
        findUser(id: ID, name: String): String
        login(id: ID!, pw: String!): String
        createMemo(Id: ID!, title: String, content: String): Memo!
        motifyMemo(Id: ID!, title: String, content: String): Memo
        deleteMemo(Id: ID!, title: String, content: String): Memo
    }
`;

const schema = makeExecutableSchema({
    typeDefs,
});

addMockFunctionsToSchema({
    schema,
    mocks
});

export default schema;