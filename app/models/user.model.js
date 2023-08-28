

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('users', {
        name: DataTypes.STRING
    });

    return User;
}