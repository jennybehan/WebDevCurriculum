// module.exports = (sequelize, DataTypes) => {
//     let Memo = sequelize.define('Memo', {
//         id: {
//             type: DataTypes.INTEGER,
//             primaryKey: true,
//             autoIncrement: true,
//         },
//         title: DataTypes.STRING,
//         content: DataTypes.TEXT,
//         // created_at: {
//         //     type: DataTypes.DATE,
//         //     defaultValue: sequelize.literal('now()')
//         // },
//         // 여기에 author_id 타입이 들어가야 하나?
//         author_name: {
//             type: DataTypes.STRING,
//             allowNull: false,
//         },
//     }, {
//         underscored: true,
//         classMethods: {
//             associate: function (models) {
//                 Memo.belongsTo(models.Author, {
//                     foreignKey: 'author_id'
//                 });
//             },
//             paranoid: true
//         }
//     });
//     return Memo;
// };

// new way
module.exports = (sequelize, DataTypes) => {
    const Memo = sequelize.define('Memo', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        content: DataTypes.TEXT,
        author_name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });

    Memo.associate = (models) => {
        Memo.belongsTo(models.Author, {
            foreignKey: 'authorId',
            as: 'author'
        });
    };

    return Memo;
}

// TODO: 두 테이블을 연결하는 다른 테이블을 만들어야 하나?
// 만약 필요하다면 그 키를 가지고 associate - through로 연결해줘야 하나?