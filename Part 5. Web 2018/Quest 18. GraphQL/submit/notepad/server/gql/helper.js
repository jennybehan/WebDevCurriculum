const path = require("path"),
    fs = require("fs");


const findUser = (userId, userPw) => {
    return users.find(user => user.userId === userId && user.userPw === userPw);
};

const getFileNameAsync = pathName => {
    return new Promise((resolve, reject) => {
        fs.readdir(pathName, (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });
};

const writeMemo = (pathName, fileText) => {
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
};

module.exports = writeMemo;