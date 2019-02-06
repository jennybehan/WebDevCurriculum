const Sequelize = require('sequelize');
const AuthorModel = require('./author');
const MemoModel = require('./memo');
const config = require('../config.js');

const db = {};

let sequelize = new Sequelize(
    config.database,
    config.username,
    config.password, {
        host: 'localhost',
        dialect: 'mysql',
        pool: {
            max: 10,
            min: 0
        }
    }
);

const Author = AuthorModel(sequelize, Sequelize);
const Memo = MemoModel(sequelize, Sequelize);

sequelize.sync({
    force: true
}).then(() => {
    console.log('db and tables created!')
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = {
    db,
    Author,
    Memo
};