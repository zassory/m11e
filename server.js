const db = require('./app/models');
const userController = require('./app/controllers/user.controller');
const projectController = require('./app/controllers/project.controller');

const run = async() => {
    const user1 = await userController.createUser({
        name: 'Nicolas Caceres',
    });

    const user2 = await userController.createUser({
        name: 'Katherine Muñoz',
    });
    //Crear un proyecto
    const project1 = await projectController.createProject({
         name: 'Proyecto A',
     });

    const project2 = await projectController.createProject({
         name: 'Proyecto X',
     });

    await projectController.addUser(project1.id, user1.id);
    await projectController.addUser(project1.id, user2.id);
    await projectController.addUser(project2.id, user1.id);

    const _project1 = await projectController.findById(project1.id);
    console.log(`Proyecto ${JSON.stringify(_project1, null, 2)}`);

    const projects = await projectController.findAll();
    console.log(`Proyecto ${JSON.stringify(projects, null, 2)}`);

    const _user = await userController.findUserById(user1.id);
    console.log(`User1: ${JSON.stringify(_user,null,2)}`);

    const users = await userController.findAll();
    console.log(`>> Usuarios: ${JSON.stringify(users,null,2)}`);
}

db.sequelize.sync({
    force: true
}).then(()=> {
    console.log('Eliminando y resincronizando la base de datos.');
    run();
});