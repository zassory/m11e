const {
    users
} = require("../models");
const db = require("../models");
const User = db.users;
const Project = db.projects;

//Crear y Guardar LOs usuarios

exports.createUser = (user) => {
    return User.create({
        name: user.name
    })
    .then( user => {
        console.log(`>> Se ha creado el usuario: ${JSON.stringify(user,null,4)}`);
        return user;
    })
    .catch(err => {
        console.log(`>> Error al crear el usuario ${err.message}`);
    });
}

exports.findUserById = (userId) => {
    return User.findByPk(userId, {
        include: [{
            model: Project,
            as: "projects",
            attributes: ["id","name"],
            through: {
                attributes: [],
            }
        }]
    })
    .then(user => {
        return user;
    })
    .catch(err => {
        console.log(`>> Error mientras se encontraba los usuarios: ${err.message}`);
    });
}

exports.findAll = () => {
    return User.findAll({
        include: [{
            model: Project,
            as: "projects",
            attributes: ["id","name"],
            through: {
                attributes: [],
            }
        }, ],
    }).then( users => {
        return users;
    }).catch(err => {
        console.log(`>> Error buscando los usuarios: ${err.message}`);
    });
}