const { Sequelize } = require('sequelize');

let sequelize;
sequelize = new Sequelize('graphql', 'newuser', 'password', {
    host: 'localhost',
    dialect: 'postgres'
});

const connect = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error(`db connection failure : ${error}`);
    }
}


sequelize.sync({ force: true });

module.exports = { sequelize, connect };
