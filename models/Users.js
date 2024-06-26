// models/User.js

const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Users = sequelize.define('Users', {
    // Define attributes
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    
});

module.exports = Users;
