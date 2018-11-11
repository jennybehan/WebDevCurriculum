import cors from 'cors';
import express from 'express';
import {
    ApolloServer,
    graphqlExpress,
    graphiqlExpress
} from 'apollo-server-express';
import bodyParser from 'body-parser';
import schema from './gql/schema';
import resolvers from './gql/resolvers';

const GRAPHQL_PORT = 3000;
const app = express();
app.use(cors());

const server = new ApolloServer({
    schema,
    resolvers,
})

server.applyMiddleware({
    app,
    path: '/graphql',
});

app.listen(GRAPHQL_PORT, () =>
    console.log(
        `GraphiQL is now running on http://localhost:${GRAPHQL_PORT}`
    )
);