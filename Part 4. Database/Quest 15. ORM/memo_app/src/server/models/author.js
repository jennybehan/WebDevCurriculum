module.exports = (sequelize, DataTypes) => {
    let Author = sequelize.define('Author', {
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
                Author.hasMany(models.Book, {
                    onDelete: 'cascade'
                });
            }
        }
    });
    return Author;
};