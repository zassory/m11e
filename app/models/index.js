const dbConfig = require("../config/db.config");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB,dbConfig.USER,dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorAliases: false,
    pool: {
        max: dbConfig.max,
        min: dbConfig.min,
        acquire: dbConfig.acquire,
        idle: dbConfig.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./user.model")(sequelize,Sequelize);
db.projects = require("./project.model")(sequelize,Sequelize);

db.users.belongsToMany(db.projects, {
    through: "user_project",
    as: 'projects', //Con este nick sale en la consulta
    foreignKey: "user_id",
});
db.projects.belongsToMany(db.users, {
    through: "user_project",
    as: 'user',
    foreignKey: 'project_id',
});

module.exports = db;