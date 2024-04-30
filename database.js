const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
    }
);

sequelize.authenticate()
    .then(() => {
        console.log('Database connection established.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

    // Sync the database
    sequelize.sync({ alter: true , logging: false})
    .then(() => {
        console.log('Database synced successfully with alter mode.');
    })
    .catch(err => {
        console.error('Failed to sync the database:', err);
    });
module.exports = sequelize;
