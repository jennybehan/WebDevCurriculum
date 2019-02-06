module.exports = (sequelize, DataTypes) => {
    let Memo = sequelize.define('Memo', {
        title: DataTypes.STRING,
        created_at: {
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('now()')
        },
        content: DataTypes.TEXT,
        author_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
        },
    }, {
        underscored: true,
        classMethods: {
            associate: function (models) {
                Memo.belongsTo(models.Author, {});
            }
        }
    });
    return Memo;
};