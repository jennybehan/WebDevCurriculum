const fetch = require('node-fetch')
const {
    GraphQLSchema,
    GraphQLObjectType,
    // GraphQLList,
    // GraphQLInt,
    // GraphQLString
} = require('graphql');

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: {
            user: {
                // id: user.id,
                // noteList: note.data
                // resolve: 
            }
        }
    }),
    muatation: new GraphQLObjectType({
        name: 'Mutation',
        // fields: // ...
    })
})