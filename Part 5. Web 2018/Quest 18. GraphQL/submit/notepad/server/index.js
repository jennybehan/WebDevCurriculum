import cors from 'cors';
import express from 'express';
import {
    ApolloServer,
    graphqlExpress,
    graphiqlExpress
} from 'apollo-server-express';
import mysql from 'mysql';
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

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'gkswndus8162',
    database: 'memo_db'
});

connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
});

function getMemoList(resolve, reject) {
    connection.query('SELECT * FROM memo', function (error, results, fields) {
        if (error) return reject(error);
        const resolvedResults = results.map(item => {
            return {
                id: item.id,
                author: item.author,
                title: item.title,
                content: item.content,
            }
        })
        resolve(resolvedResults);
    });
}

const resolver = function (result) {
    console.log(result);
};
const rejecter = function (err) {
    console.log('에러');
    console.error(err);
}
getMemoList(resolver, rejecter);

// Promise

function getMemoListPromise() {
    return new Promise(getMemoList);
}

getMemoListPromise()
    .then(resolver)
    .catch(rejecter);

async function getMemoListAsync() {
    return await getMemoListPromise();
}

try {
    getMemoListAsync();
} catch (e) {
    console.error(e);
}

// function getMemoList(callback) {
//     connection.query('SELECT * FROM memo', callback);
// }

connection.end();