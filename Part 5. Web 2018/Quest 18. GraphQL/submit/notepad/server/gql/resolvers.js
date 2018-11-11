// user data
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

var testObject = {
    'one': 1,
    'two': 2,
    'three': 3
};

const fs = require('fs');
const path = require('path');

const pathName = path.join(__dirname);
// let memoData = fs.readFileSync(pathName + '/data.json').toString();
let memoData = require('./data');

const {
    writeMemo
} = require('./helper');

const resolvers = {
    Query: {
        getUsers: () => users,
        getUser: (getUsers, {
            id,
            pw
        }) => {
            return users.find(user => user.id === id && user.pw === pw);
        },
        login: (getUsers, {
            id,
            pw
        }) => {
            const findUser = users.find(user => user.id === id && user.pw === pw);
            if (findUser) {
                return findUser;
            }
        },
        getMemoList: () => memoData,
        getMemo: (getMemoList, {
            _id
        }) => {
            if (_id) {
                return memoData.find(memo => memo._id === _id);
            } else {
                next();
            }
        }
    },
    Mutation: {
        createMemo: (getMemoList, args) => {
            const newMemo = args;
            args._id = Math.random().toString(36).substr(2, 9);
            memoData.concat([newMemo]);
            return newMemo;
        },
        deleteMemo: (getMemoList, args) => {
            delete memoData.find(memo => memo._id === args._id);
        },
        login(getUsers, {
            id,
            pw
        }, context, info) {
            try {
                const findUser = users.find(user => user.id === id && user.pw === pw);
                // if (findUser.length > 0) {
                if (findUser) {
                    return findUser;
                    let msg = 'success';
                } else {
                    let msg = '비밀번호가 일치하지 않습니다.';
                }
                // } else {
                //     msg = '아이디가 존재하지 않습나다.';
                // }
                return findUser;
            } catch (error) {
                console.log(error);
            }
        },
    }
}

module.exports = resolvers;