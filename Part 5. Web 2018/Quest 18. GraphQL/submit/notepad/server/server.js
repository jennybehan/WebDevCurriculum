const express = require("express"),
    path = require("path"),
    app = express(),
    bodyParser = require("body-parser"),
    fs = require("fs"),
    session = require("express-session"),
    cookieParser = require("cookie-parser");

app.enable('trust proxy');
app.use(express.static("client"));
app.use(bodyParser.json());
const {
    graphql,
    buildSchema
} = require('graphql')
const graphqlHttp = require('express-graphql')

app.all('/*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, Content-Type, X-Requested-With, Authorization, withCredentials"
    );
})

const schema = buildSchema(`
    type User {
        id: String!
        pw: String!
    }

    type Memo {
        id: String!
        title: String
        content: String
        userId: String
    }

    type Query {
        getUser(id: String!, pw: String!): [User]
        getMemoList(id: String!): [Memo]
        getMemo(id: Int!, content: String): Memo
        getTitle(id: Int!, title: String): String!
    }

    type Mutation {
        login(id: String, pw: String): String
        createMemo(Id: String!, title: String, content: String): String
        motifyMemo(Id: String!, title: String, content: String): String
        deleteMemo(Id: String!, title: String, content: String): String
    }
`)

// const root = {
//     hello() {
//         return 'Hello World!';
//     }
// }
const users = [{
        userId: "user01",
        userPw: "1111"
    },
    {
        userId: "user02",
        userPw: "2222"
    },
    {
        userId: "user03",
        userPw: "3333"
    }
];

const resolvers = {
    Query: {
        getUserData: (id, pw) => {
            return users.find(user => user.userId === userId && user.userPw === userPw);
        },
        getFileNameAsync: pathName => {
            return new Promise((resolve, reject) => {
                fs.readdir(pathName, (err, data) => {
                    if (err) reject(err);
                    else resolve(data);
                });
            });
        },
        writeFileDataAsync: (pathName, fileText) => {
            return new Promise((resolve, reject) => {
                fs.writeFile(
                    pathName,
                    fileText, {
                        encoding: "utf8"
                    },
                    err => {
                        if (err) reject(err);
                        else resolve();
                    }
                );
            });
        },
        getMemoList: (id) => {
            console.log('test!')
            return id
        },
        getMemo: (id) => {
            console.log('getMemo')
        },
        getTitle: (id) => {
            console.log('getTitle')
        }
    },
    Mutation: {
        async login(id, pw) {
            const id = req.body.id;
            const pw = req.body.pw;

            const pathName = path.join(__dirname, "memo");
            const fileNames = await getFileNameAsync(pathName);
            try {
                if (findUser(id, pw)) {
                    req.session.save(err => {
                        if (err) {
                            res.status(401).send("유효하지 않습니다. 다시 로그인해주세요.");
                        } else {
                            req.session.username = id;
                            success = true;
                            res.send({
                                username: id
                            })
                        }
                    })
                } else {
                    res.status(401).send("유효하지 않습니다. 다시 로그인해주세요.");
                }
            } catch (error) {
                res.status(500).json({
                    error: error.toString()
                });
            }
        },
        // [TODO] logout
        getMemoList() {
            try {
                const pathName = path.join(__dirname, "memo");
                const fileNames = getFileNameAsync(pathName);
                if (fileNames) {
                    const data = fileNames.map(fileName => {
                        const content = fs.readFileSync(pathName + "/" + fileName).toString();
                        const data = JSON.parse(content);
                        return data;
                    });
                    res.status(200).send({
                        data
                    });
                } else {
                    next();
                }
            } catch (error) {
                console.log(error);
                res.sendStatus(500);
            }
        }
    }
};

const rootValue = {
    User: {
        id: 'user01',
        pw: '1111'
    }
}

app.use('/graphql', graphqlHttp((req, res) => ({
    req,
    res,
    schema,
    resolvers,
    graphiql: true
})))
// app.use('/graphql', graphqlHttp({
//     // rootValue,
//     schema,
//     resolvers,
//     graphiql: true
// }))

app.listen(3000, () => {
    console.log('Listening ...')
})