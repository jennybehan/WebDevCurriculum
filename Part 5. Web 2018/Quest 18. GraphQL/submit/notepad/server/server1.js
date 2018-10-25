const express = require("express"),
    path = require("path"),
    app = express(),
    bodyParser = require("body-parser"),
    fs = require("fs"),
    cors = require('cors'),
    session = require("express-session"),
    cookieParser = require("cookie-parser"),
    {
        graphql,
        buildSchema
    } = require('graphql'),
    graphqlHttp = require('express-graphql');

const schema = require('./gql/schema.js');
import {
    graphqlExpress,
    graphiqlExpress
} from 'apollo-server-express';

const GRAPHQL_PORT = 3000;

const graphQLServer = express();

graphQLServer.use('/graphql', bodyParser.json(), graphqlExpress({
    schema
}));
graphQLServer.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql'
}));

// app.use(cors({
//     credentials: true,
//     origin: 'http://localhost:8080'
// }));

// app.use(session({
//     secret: 'secret',
//     cookie: {
//         secure: true,
//         maxAge: 86400
//     }
// }));

// app.enable('trust proxy');
// app.use(express.static("client"));
// app.use(bodyParser.json());

// app.use((req, res, next) => {
//     fs.readdir(__dirname + "/memo", err => {
//         if (err) {
//             fs.mkdir(__dirname + "/memo", err => {
//                 if (err) console.error(err);
//             });
//         }
//     });
//     next();
// });

// const users = [{
//         ID: "user01",
//         Pw: "1111"
//     },
//     {
//         ID: "user02",
//         Pw: "2222"
//     },
//     {
//         ID: "user03",
//         Pw: "3333"
//     }
// ];

// const findUser = (userId, userPw) => {
//     return users.find(user => user.userId === userId && user.userPw === userPw);
// };

// const login = async (req, res, next) => {
//     const id = req.body.id;
//     const pw = req.body.pw;

//     console.log(id, pw)
//     try {
//         if (findUser(id, pw)) {
//             req.session.save(err => {
//                 if (err) {
//                     res.status(401).send("유효하지 않습니다. 다시 로그인해주세요.");
//                 } else {
//                     req.session.username = id;
//                     success = true;
//                     res.send({
//                         username: id
//                     })
//                 }
//             })
//         } else {
//             res.status(401).send("유효하지 않습니다. 다시 로그인해주세요.");
//         }
//     } catch (err) {
//         console.log(err)
//     }
// };

// const getFileNameAsync = pathName => {
//     return new Promise((resolve, reject) => {
//         fs.readdir(pathName, (err, data) => {
//             if (err) reject(err);
//             else resolve(data);
//         });
//     });
// };

// const writeFileDataAsync = (pathName, fileText) => {
//     return new Promise((resolve, reject) => {
//         fs.writeFile(
//             pathName,
//             fileText, {
//                 encoding: "utf8"
//             },
//             err => {
//                 if (err) reject(err);
//                 else resolve();
//             }
//         );
//     });
// };

// const getMemoList = async (req, res, next) => {
//     try {
//         const pathName = path.join(__dirname, "memo");
//         const fileNames = await getFileNameAsync(pathName);
//         if (fileNames) {
//             const data = fileNames.map(fileName => {
//                 const content = fs.readFileSync(pathName + "/" + fileName).toString();
//                 const data = JSON.parse(content);
//                 return data;
//             })
//             return data;
//             // res.status(200).send({
//             //     data
//             // });
//         } else {
//             next();
//         }
//     } catch (error) {
//         console.log(error);
//         // res.sendStatus(500);
//     }
// }

// const getMemo = async (id) => {
//     try {
//         const memoList = await getMemoList();
//         if (memoList.length > 0) {
//             const selectedMemo = memoList.find(memo => {
//                 return memo._id === id.id
//             })
//             return selectedMemo
//         }
//     } catch (error) {
//         console.log(error)
//     }
// }

// let rootValue = {
//     Memo: getMemo,
//     MemoList: getMemoList,
// }

fetch('http://localhost:3000/graphql', {
    method: 'POST',
    mode: 'cors',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        "query": "{\n  author\n}",
        "variables": null,
        "operationName": null
    })
}).then(function (res) {
    res.json().then(console.log)
}).catch(console.error)


// const base = 'https://localhost:3000'

// const resolvers = {
//     Query: {
//         // users: () => {
//         //     return fetch(`${base}/users`).then(res => res.json())
//         // }
//         // memoList: () => {
//         //     return fetch(`${base}/memo`).then(res => res.json())
//         // },
//         // memo: (parent, args) => {
//         //     const {
//         //         id
//         //     } = args
//         //     return fetch(`${base}/memo/${id}`).then(res => res.json())
//         // },
//     },
//     Mutation: {
//         findUser: (userId, userPw) => {
//             return users.find(user => user.userId === userId && user.userPw === userPw);
//         },
//         login: (id, pw) => {
//             console.log('test')
//             try {
//                 if (findUser(id, pw)) {
//                     const user = id
//                     console.log('user: ', user)
//                     return 'user'
//                 } else {
//                     console.log('로그인 실패')
//                 }
//             } catch (err) {
//                 console.log(err)
//             }
//             return 'usertets'
//         },
//         // [TODO] logout
//         // [TODO] write note
//     }
// };

// why async? express-graphql : https://github.com/graphql/express-graphql#other-exports 
// app.use('/graphql', graphqlHttp((req, res) => ({
//     schema,
//     rootValue,
//     resolvers,
//     context: {
//         req,
//         res
//     },
//     graphiql: true
// })))

graphQLServer.listen(GRAPHQL_PORT, () => {
    console.log(
        `GraphiQL is now running on http://localhost:${GRAPHQL_PORT}/graphiql`
    )
})