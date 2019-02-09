module.exports = (sequelize, DataTypes) => {
    const Author = sequelize.define('Author', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: DataTypes.STRING,
    }, {
        underscored: true,
        classMethods: {
            associate: function (models) {
                Author.hasMany(models.Memo, {
                    onDelete: 'cascade'
                });
            }
        }
    });
    return Author;
};