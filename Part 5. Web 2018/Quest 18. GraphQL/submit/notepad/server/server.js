const express = require('express')
const graphqlHttp = require('express-graphql')
const {
    buildSchema
} = require('graphql')
const app = express()

// const schema = require('./schema')
const schema = buildSchema(`
    type Query {
        getMemo(id: String!): Object
        getTitle(id: String!): String!
    }

    type Mutation {
        createMemo(memo: String!): String
        motifyMemo(memo: String): String
        deleteMemo(memo: String)
    }
`)

const root = {
    hello() {
        return 'Hello World!';
    }
}

app.use('/graphql', graphqlHttp({
    schema,
    graphql: true
}))

app.listen(4000)
console.log('Listening ...')

// server 구성을 어떻게 해야할까?
// Schema, Resolver